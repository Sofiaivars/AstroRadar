import os
from dotenv import load_dotenv
from openai import OpenAI

def cosmo_tip():
    prompt = "Dame un tip para la visualización de eventos astronómicos, relacionado con la localización, contaminación lumínica, climatología y más cosas del estilo. La respuesta no debe tener más de 10 palabras."
    
    load_dotenv()
    openai_key = os.getenv("OPENAI_API_KEY")
    
    client = OpenAI(api_key=openai_key)
    
    response = client.responses.create(
        model="gpt-3.5-turbo",
        input=prompt
    )
    
    return response.output_text

def cosmo_first_step_tip(eventoAstronomico):
    prompt = f"Dame un dato sobre el evento astronómico: {eventoAstronomico}, como experto en eventos astronómicos. La respuesta no debe tener más de 15 palabras y siempre debes mencionar el evento al que hacer referencia."
    
    load_dotenv()
    openai_key = os.getenv("OPENAI_API_KEY")
    
    client = OpenAI(api_key=openai_key)
    
    response = client.responses.create(
        model="gpt-3.5-turbo",
        input=prompt
    )
    
    return response.output_text

def cosmo_second_step():
    prompt = "Eres un experto en visualización de eventos astronómicos. Dame un tip para observar este tipo de eventos de noche. La respuesta no debe tener más de 15 palabras."
    
    load_dotenv()
    openai_key = os.getenv("OPENAI_API_KEY")
    
    client = OpenAI(api_key=openai_key)
    
    response = client.responses.create(
        model="gpt-3.5-turbo",
        input=prompt
    )
    
    return response.output_text