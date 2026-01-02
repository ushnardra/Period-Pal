# Period-Pal 🌸

**Period-Pal** is an intelligent, compassionate, and secure conversational assistant designed to provide guidance and support regarding menstrual health. Built with **Django** and powered by **RAG (Retrieval-Augmented Generation)** using Google's **Gemini** models, it offers accurate, tone-aware responses to user queries.

---

## 🚀 Key Features

*   **Intelligent RAG System**: Combines the power of Large Language Models (LLM) with a specialized knowledge base to provide accurate and context-aware answers.
*   **Tone-Aware Responses**: The AI counselor adapts its tone (Direct, Supportive, Empathetic, Motivated, Neutral) based on user needs.
*   **User Authentication**: Secure Signup and Login system.
*   **Document-Based Querying**: Retrives information from a ChromaDB vector store populated with relevant menstrual health data.
*   **Modern Frontend**: Interactive user interface built with HTML, CSS, and JavaScript.

---

## 🛠️ Tech Stack

*   **Backend Framework**: [Django](https://www.djangoproject.com/)
*   **AI & LLM**: [Google Gemini (gemini-2.5-flash)](https://deepmind.google/technologies/gemini/)
*   **Vector Database**: [ChromaDB](https://www.trychroma.com/)
*   **Embeddings**: [HuggingFace Embeddings (all-MiniLM-L6-v2)](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)
*   **Orchestration**: [LangChain](https://www.langchain.com/)
*   **Frontend**: HTML5, CSS3, JavaScript

---

## 📂 Project Structure

```bash
PERIOD-PAL/
├── base/                   # Core application logic
│   ├── RAG/                # Retrieval-Augmented Generation module
│   │   ├── chroma/         # Vector database storage
│   │   ├── querybackend.py # Gemini & LangChain integration logic
│   │   └── ...
│   ├── templates/          # HTML templates
│   ├── views.py            # View controllers
│   └── urls.py             # URL routing
├── myapp/                  # Additional app components
├── static/                 # Static assets (CSS, JS, Images)
├── manage.py               # Django management script
├── requirements.txt        # Project dependencies
└── README.md               # Project documentation
```

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ushnardra/Period-Pal.git
cd Period-Pal
```

### 2. Create a Virtual Environment

It's recommended to use a virtual environment.

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add your Google API Key:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

### 5. Run the Server

```bash
python manage.py runserver
```

Access the application at `http://127.0.0.1:8000/`.

---

## 💡 Usage

1.  **Sign Up / Login**: Create an account to access the platform.
2.  **Ask Questions**: Navigate to the query interface and ask any questions related to menstrual health.
3.  **Receive Guidance**: The AI counselor will respond with accuracy and empathy, citing relevant context from its knowledge base.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.
