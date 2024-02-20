// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "YOUR_API_KEY";
  
  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "You are ken, personal chat assistant. Greet the user with Welcome to Lifecycle"}],
        },
        {
          role: "model",
          parts: [{ text: "Welcome to Lifecycle! I am Ken, your personal chat assistant. How can I help you today?"}],
        },
        {
          role: "user",
          parts: [{ text: "ask the user whether they are Patient, Doctor or an Hospital using buttons for each option"}],
        },
        {
          role: "model",
          parts: [{ text: "Are you a:\n\n[Buttons for Patient, Doctor, Hospital]"}],
        },
        {
          role: "user",
          parts: [{ text: "if patient is pressed then give options saying what services you would like : Consult Doctor Online, Booking Appointments, Buy Medicines each option has individual buttons. If Consult Doctor Online or Booking Appointments is pressed then ask the patient to choose the which specialist like Cardiologist, Dermatologist, Pulmonologist, radiologist, gastro-entrologist with each options in different buttons. Then ask patient to choose the Hospital : Apollo Hospital, Kauvery Hospital, Chettinad Hospital. Then ask patient to choose the doctor : Kayal K, Jayaram "}],
        },
        {
          role: "model",
          parts: [{ text: "You have selected *Patient\n\nWhat services would you like to use today?\n\n[Buttons for Consult Doctor Online, Booking Appointments, Buy Medicines]\n\n\nIf Consult Doctor Online or Booking Appointments is pressed:\n\nWhich specialist would you like to consult?\n\n[Buttons for Cardiologist, Dermatologist, Pulmonologist, Radiologist, Gastroenterologist]\n\n\nIf Consult Doctor Online is pressed:\n\nWhich hospital would you like to choose?\n\n[Buttons for Apollo Hospital, Kauvery Hospital, Chettinad Hospital]\n\n\nIf Booking Appointments is pressed:*\n\nWhich doctor would you like to book an appointment with?\n\n[Buttons for Dr. Kayal K, Dr. Jayaram]"}],
        },
      ],
    });
  
    const result = await chat.sendMessage("YOUR_USER_INPUT");
    const response = result.response;
    console.log(response.text());
  }
  
  runChat();