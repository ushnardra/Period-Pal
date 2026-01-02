from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment
load_dotenv()
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Gemini model initialization
model = genai.GenerativeModel('gemini-2.5-flash')

# Chroma DB path
CHROMA_PATH = "base/RAG/chroma"  # Use forward slash

def ask_gemini(question,tone):
    # Initialize embeddings and vector store
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embeddings)

    docs = db.similarity_search(question, k=3)
    context = "\n".join([d.page_content for d in docs])

    # Prepare prompt
    prompt = f"""

    If the context is completely unrelated or out of context i.e questions other than menstrual health /period or  , say 'I'm sorry, this question is not relevant here.'
    Tone: Direct: Clear, factual, no emotion.
          Supportive: Reassuring, kind, comforting.
          Empathetic: Emotion-aware, understanding.
          Motivated: Uplifting, positive, encouraging.
          Neutral: Balanced, calm, objective. 

    You are a  knowledgeable period counselor. The user is your patient, seeking guidance and support regarding their menstrual health and related concerns.
    Answer their questions using the context below following the  Tone : {tone}.
    Whenever you are answering a question , never include any references like Q5 asks , as noted in Q2 or any other things from the dataset .
    If the answer can be inferred from the context, explain it accurately in a comforting and supportive tone and in concise way (short like human).
    You should answer the user in a friendly manner and should be able to answer the user's questions in a way that is easy to understand.
    Some questions can be  very explicit and sensitive, so be sure to answer them and don't say the question is irrelevant.
    

    Context:
    {context}

    Question:
    {question}
    """
    
    # Get Gemini response
    response = model.generate_content(prompt)
    print("Answer:", response.text)
    return response.text
