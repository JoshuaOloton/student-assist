import streamlit as st
import rag as rag_backend

st.title("Basic Chat App with RAG")
st.subheader("Ask questions based on ingested text documents using Retrieval-Augmented Generation (RAG).", divider=True)

with st.sidebar:
    st.text("Upload context")
    user_query = st.text_area("Enter knowledge source", height=150)
    if st.button("Upload", use_container_width=True):
        if not user_query.strip():
            st.warning("Please enter some text to upload.")
        else:
            try:
                with st.spinner():
                    rag_backend.ingest_text(user_query)
                    st.success("Text uploaded successfully!")
            except Exception as e:
                st.error(f"An error occurred while uploading the text: {e}")

# initialize message history
if "messages" not in st.session_state:
    st.session_state.messages = []

# display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])

# handle user input
if prompt := st.chat_input("Ask anything"):
    with st.chat_message("user"):
        st.write(prompt)
    st.session_state.messages.append({"role": "user", "content": prompt})

    with st.chat_message("assistant"):
        with st.spinner("Thinking"):
            result = rag_backend.get_rag_response(prompt)
            answer = result["answer"]
            sources = result["sources"]

            st.write(answer)
            st.session_state.messages.append({"role": "assistant", "content": answer})

            # display sources
            with st.expander("Sources"):
                for i, source in enumerate(sources):
                    st.write(f"**Source {i+1}:** {source.page_content}")
