from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import SignUpForm, SearchForm
from .models import User
from django.db.models import Q
from .RAG.querybackend import ask_gemini

def details(request):
    # Landing page view with embedded auth forms
    return render(request, 'base/details.html', {
        'signup_form': SignUpForm(),
        'login_form': AuthenticationForm()
    })

def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('card')
        else:
            print("Signup Form Errors:", form.errors) # Debugging
            # If signup fails, re-render details with errors
            return render(request, 'base/details.html', {
                'signup_form': form,
                'login_form': AuthenticationForm(),
                'show_signup': True # Flag to keep signup tab active
            })
    return redirect('details')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('card')
        else:
            print("Login Form Errors:", form.errors) # Debugging
             # If login fails, re-render details with errors
            return render(request, 'base/details.html', {
                'signup_form': SignUpForm(),
                'login_form': form,
                'show_login': True # Flag to keep login tab active
            })
    return redirect('details')

def query(request):
    # Clear chat history on initial load or reload (GET request)
    if request.method == 'GET':
        request.session['chat_history'] = []
    
    # Ensure chat history exists for POST requests
    if 'chat_history' not in request.session:
        request.session['chat_history'] = []

    question = None
    answer = None
    
    # Get tone and avatar from GET (initial load) or POST (form submission)
    # If not in POST, fallback to session or GET, but prioritize current request
    tone = request.POST.get('tone') or request.GET.get('tone')
    avatar = request.POST.get('avatar') or request.GET.get('avatar')
    
    # If tone/avatar are in GET, we might want to store them in session to persist across simple reloads if needed,
    # but for now passing them in hidden fields is fine. 
    # However, to ensure they stick if the user just refreshes, let's put them in session if present.
    if tone:
        request.session['current_tone'] = tone
    else:
        tone = request.session.get('current_tone')
        
    if avatar:
        request.session['current_avatar'] = avatar
    else:
        avatar = request.session.get('current_avatar')

    if request.method == 'POST':
        question = request.POST.get('question')
        
        if question:
            # Add user message to history
            request.session['chat_history'].append({'role': 'user', 'content': question})
            request.session.modified = True
            
            try:
                answer = ask_gemini(question, tone)
                # Add AI message to history
                request.session['chat_history'].append({'role': 'ai', 'content': answer})
                request.session.modified = True
            except Exception as e:
                answer = f"Error: {str(e)}"
                request.session['chat_history'].append({'role': 'ai', 'content': answer, 'error': True})
                request.session.modified = True
       
    return render(request, 'base/query.html', {
        'chat_history': request.session['chat_history'],
        'tone': tone,
        'avatar': avatar
    })

def card(request):
    return render(request, 'base/card.html')