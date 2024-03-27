import React, {useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import httpClient from "../httpClient";



const Questionnaire: React.FC = () => {


    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');
    
        // When the component unmounts, remove the class
        return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };
      }, []);

      const data = [
        {
            question: "How soon do you anticipate needing access to the money you invest?",
            option1: "Less than 1 year",
            option2: "1 to 3 years",
            option3: "4 to 7 years",
            option4: "More than 7 years",
        },
        {
            question: "How comfortable are you with the potential for your investments to lose value in the short term?",
            option1: "I am very uncomfortable and would prefer to avoid any potential losses",
            option2: "I am somewhat uncomfortable but willing to accept some risk for potentially higher returns.",
            option3: "I am comfortable with moderate fluctuations and understand the potential for short-term losses.",
            option4: "I am comfortable with significant fluctuations and prioritize the potential for high returns, even if it means accepting higher risk",
        },
        {
            question: "How would you describe your overall financial situation?",
            option1: "I have limited savings and significant debt",
            option2: "I have some savings and manageable debt",
            option3: "I have a comfortable savings cushion and no significant debt",
            option4: "I have a substantial amount of savings and financial security",
        },
        {
            question: "Which statement best describes your approach to financial decisions?",
            option1: "I prioritize safety and security above all else, even if it means lower potential returns",
            option2: "I prefer a balanced approach, considering both risk and potential reward",
            option3: "I am willing to take some calculated risks for the chance of higher returns",
            option4: "I am comfortable with significant risk for the potential of maximizing my returns",
        },
        {
            question: "How familiar are you with different investment options (stocks, bonds, mutual funds, etc.)?",
            option1: "I am not familiar with any investment options",
            option2: "I have a basic understanding of some common options",
            option3: "I am somewhat knowledgeable about various investment options",
            option4: "I have a strong understanding of diverse investment options and strategies",
        },
        {
            question: "In the past, how have you reacted to experiencing losses in your investments?",
            option1: "I became very anxious and sold my investments immediately",
            option2: "I felt uneasy but held onto my investments and waited for recovery",
            option3: "I remained calm and adjusted my investment strategy as needed",
            option4: "I saw it as an opportunity to potentially buy more at a lower price",
        },
        {
            question: "When making investment decisions, how much weight do you place on the advice of a financial professional?",
            option1: "I rely heavily on professional advice and guidance",
            option2: "I consider professional advice but ultimately make my own decisions",
            option3: "I seek professional advice but do my own research before making decisions",
            option4: "I primarily rely on my own research and judgment when making investment decisions",
        },
        {
            question: "Which investment scenario appeals to you the most?",
            option1: "Consistent, predictable returns with minimal risk",
            option2: "Moderate growth potential with some possibility of fluctuations",
            option3: "The potential for high returns, even if it involves significant risk",
            option4: "The thrill of potentially achieving exceptional rewards despite high risk",
        },
        {
            question: "How important is it to you to leave a financial legacy for your loved ones?",
            option1: "This is not a significant factor in my investment decisions",
            option2: "I would like to leave some financial security for my loved ones, but it’s not my primary goal",
            option3: "Leaving a financial legacy for my loved ones is moderately important to me",
            option4: "Leaving a substantial financial legacy for my loved ones is a major priority",
        },
        {
            question: "How would you describe your overall risk tolerance level?",
            option1: "Very risk-averse, prioritizing safety and security",
            option2: "Somewhat risk-averse, comfortable with some calculated risks",
            option3: "Moderately risk-tolerant, open to moderate risk for potential gains",
            option4: "High risk tolerance, comfortable with significant risk for potentially high returns",
        },
        {
            question: "How would you feel if your investments lost 10% of their value in a short period?",
            option1: "I would be extremely worried and consider selling everything",
            option2: "I would be concerned but confident in my long-term investment strategy",
            option3: "I would be slightly anxious but monitor the situation and stay invested",
            option4: "I would view it as a potential buying opportunity and consider adding to my investments",
        },
        {
            question: "How important is it for you to keep up with current financial news and trends?",
            option1: "I am not interested in following financial news or trends",
            option2: "I occasionally stay informed about major financial events",
            option3: "I regularly follow financial news and trends to stay informed",
            option4: "I actively research and analyze financial news and trends to make informed decisions",
        },
        {
            question: "Imagine you have $10,000 to invest. Which scenario would you prefer?",
            option1: "Invest it all in a low-risk savings account, guaranteeing a small but steady return",
            option2: "Divide it equally between a low-risk bond fund and a moderate-risk stock fund",
            option3: "Invest the majority in a high-risk growth stock fund, with a smaller portion in a low-risk bond fund",
            option4: "Allocate the entire amount to a high-risk, high-reward investment opportunity like cryptocurrency",
        },
        {
            question: "How would you describe your personality in terms of financial decision-making?",
            option1: "I am very cautious and avoid any unnecessary financial risks",
            option2: "I am deliberate and prefer to make calculated decisions based on research",
            option3: "I am open to taking some risks when there is a potential for higher returns",
            option4: "I am adventurous and willing to take significant risks for potentially exceptional gains",
        },
        {
            question: "Which of the following statements best reflects your investment philosophy?",
            option1: "My primary goal is to preserve my capital and avoid any losses",
            option2: "I aim for a balance between minimizing risk and achieving reasonable returns",
            option3: "I prioritize maximizing potential returns, even if it involves accepting higher risk",
            option4: "I am primarily driven by achieving financial goals quickly, even if it means taking substantial risks",
        },
      ];
    
    let [index, setIndex] = useState(0);
    let [question , setQuestion] = useState(data[index]);
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [answer5, setAnswer5] = useState("");
    const [answer6, setAnswer6] = useState("");
    const [answer7, setAnswer7] = useState("");
    const [answer8, setAnswer8] = useState("");
    const [answer9, setAnswer9] = useState("");
    const [answer10, setAnswer10] = useState("");
    const [answer11, setAnswer11] = useState("");
    const [answer12, setAnswer12] = useState("");
    const [answer13, setAnswer13] = useState("");
    const [answer14, setAnswer14] = useState("");
    const [answer15, setAnswer15] = useState("");
    const [isAnswered1, setIsAnswered1] = useState(false); 
    const [isAnswered2, setIsAnswered2] = useState(false); 
    const [isAnswered3, setIsAnswered3] = useState(false); 
    const [isAnswered4, setIsAnswered4] = useState(false);
    const [isAnswered5, setIsAnswered5] = useState(false);
    const [isAnswered6, setIsAnswered6] = useState(false);
    const [isAnswered7, setIsAnswered7] = useState(false);
    const [isAnswered8, setIsAnswered8] = useState(false);
    const [isAnswered9, setIsAnswered9] = useState(false);
    const [isAnswered10, setIsAnswered10] = useState(false);
    const [isAnswered11, setIsAnswered11] = useState(false);
    const [isAnswered12, setIsAnswered12] = useState(false);
    const [isAnswered13, setIsAnswered13] = useState(false);
    const [isAnswered14, setIsAnswered14] = useState(false);
    const [isAnswered15, setIsAnswered15] = useState(false); 
    const [selectedOption, setSelectedOption] = useState<string | null>(null);


    const handleAnswerSelection = (answer: string , option: string) => {
        setSelectedOption(option); // Update selected option
        if(index === 0){
            
            setAnswer1(answer);
            //setIsAnswered1(true);
        }
        else if(index === 1){
            setAnswer2(answer);    
            setIsAnswered2(true);
        }
        else if(index === 2){
            setAnswer3(answer);   
            setIsAnswered3(true); 
        }
        else if(index === 3){
            setAnswer4(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 4){
            setAnswer5(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 5){
            setAnswer6(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 6){
            setAnswer7(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 7){
            setAnswer8(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 8){
            setAnswer9(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 9){
            setAnswer10(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 10){
            setAnswer11(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 11){
            setAnswer12(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 12){
            setAnswer13(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 13){
            setAnswer14(answer); 
            //setIsAnswered4(true);   
        }
        else if(index === 14){
            setAnswer15(answer); 
            setIsAnswered15(true);   
        }

        
    };
    const showToast = (message: string, type: 'success' | 'error'): void => {
        if (type === 'success') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          toast.success(message);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          toast.error(message);
        }
      };

    
    
    const handleNextQuestion = () => {
       if (index < data.length - 1) {
            if(selectedOption !== null ){
                setIndex(index + 1);
                setQuestion(data[index + 1]); // Update question
                setSelectedOption(null); // Reset selected option for the next question
                
                
            }else{
                //alert("Please select an option before proceeding.");
                showToast('Please select an option before proceeding.', 'error');
                return;
            }
        } else {          
                  // You can perform any action when all questions are answered
            alert("You have answered all the questions!!");
        }
    };

    // Add the function to handle going back to the previous question
const handlePreviousQuestion = () => {
    if (index > 0) {
        setIndex(index - 1);
        setQuestion(data[index - 1]);
        // Retrieve the previously selected answer and update the corresponding state
        if (index - 1 === 0) {
            setAnswer1("");
            setIsAnswered1(false);
        } else if (index - 1 === 1) {
            setAnswer2("");
            setIsAnswered2(false);
        } else if (index - 1 === 2) {
            setAnswer3("");
            setIsAnswered3(false);
        } else if (index - 1 === 3) {
            setAnswer4("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 4) {
            setAnswer5("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 5) {
            setAnswer6("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 6) {
            setAnswer7("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 7) {
            setAnswer8("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 8) {
            setAnswer9("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 9) {
            setAnswer10("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 10) {
            setAnswer11("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 11) {
            setAnswer12("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 12) {
            setAnswer13("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 13) {
            setAnswer14("");
            //setIsAnswered4(false);
        }
        else if (index - 1 === 14) {
            setAnswer15("");
            setIsAnswered15(false);
        }
   
        
        setSelectedOption(null); // Reset selected option for the previous question
    }
};

    const handleSubmit = async () => {
        console.log("Selected Answers:");
        console.log("Answer 1:", answer1);
        console.log("Answer 2:", answer2);
        console.log("Answer 3:", answer3);
        console.log("Answer 4:", answer4);
        console.log("Answer 5:", answer5);
        console.log("Answer 6:", answer6);
        console.log("Answer 7:", answer7);
        console.log("Answer 8:", answer8);
        console.log("Answer 9:", answer9);
        console.log("Answer 10:", answer10);
        console.log("Answer 11:", answer11);
        console.log("Answer 12:", answer12);
        console.log("Answer 13:", answer13);
        console.log("Answer 14:", answer14);
        console.log("Answer 15:", answer15);
        
        alert("You have answered all the questions!!");
        // Add more answers as needed
        
        // Redirect to the login page
        //window.location.href = '/LandingPage';
        try{
            const resp = await httpClient.post("//localhost:5000/questionnaire" , {
              answer1: answer1,
              answer2: answer2,
              answer3: answer3,
              answer4:answer4,
              answer5: answer5,
              answer6: answer6,
              answer7: answer7,
              answer8:answer8,
              answer9: answer9,
              answer10: answer10,
              answer11: answer11,
              answer12:answer12,
              answer13: answer13,
              answer14: answer14,
              answer15: answer15,
            });
      
            window.location.href = "/";
      
          }catch(error: any){
            if(error.response && error.response.status === 401){
              alert("Invalid credientials");
            }else {
              console.error("An error occurred while signing up:", error);
              // Handle other types of errors, such as network errors
            }
          }
        
        

    };
    
    

    return(
        <>
            <ToastContainer />
            <div className="questionnaire">
                <div className="quiz-card">
                <h2>Quiz</h2>
                <hr />
                <h3>{index+1}. {question.question}</h3>
                <ul>
                    <li className={selectedOption === question.option1 ? "selected" : ""} onClick={() => handleAnswerSelection(question.option1, question.option1)}>{question.option1}</li>
                    <li className={selectedOption === question.option2 ? "selected" : ""} onClick={() => handleAnswerSelection(question.option2 , question.option2)}>{question.option2}</li>
                    <li className={selectedOption === question.option3 ? "selected" : ""} onClick={() => handleAnswerSelection(question.option3, question.option3)}>{question.option3}</li>
                    <li className={selectedOption === question.option4 ? "selected" : ""} onClick={() => handleAnswerSelection(question.option4 , question.option4)}>{question.option4}</li>
                </ul>
                <div className="button-container">
                <button className="previous-btn" onClick={handlePreviousQuestion} disabled={index === 0}>Previous</button>
                {/*index === data.length - 1 &&*/ isAnswered15? (
                    <button className="submit-btn" onClick={handleSubmit} >Submit</button>
                ) : (
                    <button className="next-btn" onClick={handleNextQuestion} >Next</button>
                )}
                </div>
                <div className="question-num">{index + 1} out of {data.length} questions</div>
                </div>
                
            </div>
        </>
    )
}
export default Questionnaire