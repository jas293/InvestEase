import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import httpClient from "../httpClient";


const Questionnaire: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');

        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if(token){
            setAuthenticated(true);
        }
    
        // When the component unmounts, remove the class
        return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };
      }, []);

    const data = [
        {
            question: "How comfortable are you with the potential for your investments to lose value in the short term?",
            options: ["Less than 1 year", "1 to 3 years", "4 to 7 years", "More than 7 years"],
        },
        {
            question: "How soon do you anticipate needing access to the money you invest?",
            options: ["I am very uncomfortable and would prefer to avoid any potential losses", 
            "I am somewhat uncomfortable but willing to accept some risk for potentially higher returns.", 
            "I am comfortable with moderate fluctuations and understand the potential for short-term losses.", 
            "I am comfortable with significant fluctuations and prioritize the potential for high returns, even if it means accepting higher risk"],
        
        },
        {
            question: "How would you describe your overall financial situation?",
            options: ["I have limited savings and significant debt",
            "I have some savings and manageable debt",
            "I have a comfortable savings cushion and no significant debt",
            "I have a substantial amount of savings and financial security"],
        },
        {
            question: "Which statement best describes your approach to financial decisions?",
            options: ["I prioritize safety and security above all else, even if it means lower potential returns",
            "I prefer a balanced approach, considering both risk and potential reward",
            "I am willing to take some calculated risks for the chance of higher returns",
            "I am comfortable with significant risk for the potential of maximizing my returns"],
        },
        {
            question: "How familiar are you with different investment options (stocks, bonds, mutual funds, etc.)?",
            options: ["I am not familiar with any investment options",
            "I have a basic understanding of some common options",
            "I am somewhat knowledgeable about various investment options",
            "I have a strong understanding of diverse investment options and strategies"],
        },
        {
            question: "In the past, how have you reacted to experiencing losses in your investments?",
            options: ["I became very anxious and sold my investments immediately",
            "I felt uneasy but held onto my investments and waited for recovery",
            "I remained calm and adjusted my investment strategy as needed",
            "I saw it as an opportunity to potentially buy more at a lower price"],
        },
        {
            question: "When making investment decisions, how much weight do you place on the advice of a financial professional?",
            options: ["I rely heavily on professional advice and guidance",
            "I consider professional advice but ultimately make my own decisions",
            "I seek professional advice but do my own research before making decisions",
            "I primarily rely on my own research and judgment when making investment decisions"],
        },
        {
            question: "Which investment scenario appeals to you the most?",
            options: ["Consistent, predictable returns with minimal risk",
            "Moderate growth potential with some possibility of fluctuations",
            "The potential for high returns, even if it involves significant risk",
            "The thrill of potentially achieving exceptional rewards despite high risk"],
        },
        {
            question: "How important is it to you to leave a financial legacy for your loved ones?",
            options: ["This is not a significant factor in my investment decisions",
            "I would like to leave some financial security for my loved ones, but it’s not my primary goal",
            "Leaving a financial legacy for my loved ones is moderately important to me",
            "Leaving a substantial financial legacy for my loved ones is a major priority"],
        },
        {
            question: "How would you describe your overall risk tolerance level?",
            options: ["Very risk-averse, prioritizing safety and security",
            "Somewhat risk-averse, comfortable with some calculated risks",
            "Moderately risk-tolerant, open to moderate risk for potential gains",
            "High risk tolerance, comfortable with significant risk for potentially high returns"],
        },
        {
            question: "How would you feel if your investments lost 10% of their value in a short period?",
            options: ["I would be extremely worried and consider selling everything",
            "I would be concerned but confident in my long-term investment strategy",
            "I would be slightly anxious but monitor the situation and stay invested",
            "I would view it as a potential buying opportunity and consider adding to my investments"],
        },
        {
            question: "How important is it for you to keep up with current financial news and trends?",
            options: ["I am not interested in following financial news or trends",
            "I occasionally stay informed about major financial events",
            "I regularly follow financial news and trends to stay informed",
            "I actively research and analyze financial news and trends to make informed decisions"],
        },
        {
            question: "Imagine you have $10,000 to invest. Which scenario would you prefer?",
            options: ["Invest it all in a low-risk savings account, guaranteeing a small but steady return",
            "Divide it equally between a low-risk bond fund and a moderate-risk stock fund",
            "Invest the majority in a high-risk growth stock fund, with a smaller portion in a low-risk bond fund",
            "Allocate the entire amount to a high-risk, high-reward investment opportunity like cryptocurrency"],
        },
        {
            question: "How would you describe your personality in terms of financial decision-making?",
            options: ["I am very cautious and avoid any unnecessary financial risks",
            "I am deliberate and prefer to make calculated decisions based on research",
            "I am open to taking some risks when there is a potential for higher returns",
            "I am adventurous and willing to take significant risks for potentially exceptional gains"],
        },
        {
            question: "Which of the following statements best reflects your investment philosophy?",
            options: ["My primary goal is to preserve my capital and avoid any losses",
            "I aim for a balance between minimizing risk and achieving reasonable returns",
            "I prioritize maximizing potential returns, even if it involves accepting higher risk",
            "I am primarily driven by achieving financial goals quickly, even if it means taking substantial risks"],
        },
        
        
    ];

    const [answers, setAnswers] = useState<string[]>(Array(data.length).fill(""));
    const [index, setIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleAnswerSelection = (answer: string, option: string) => {
        setSelectedOption(option);
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const handlePreviousQuestion = () => {
        if (index > 0) {
            setIndex(index - 1);
            setSelectedOption(answers[index - 1]); // Preserve the selected option
        }
    };

    const handleNextQuestion = () => {
        if (answers[index] !== "") {
            const newAnswers = [...answers];
            newAnswers[index] = selectedOption; // Save the selected option for the current question
            setAnswers(newAnswers);
    
            if (index < data.length - 1) {
                setIndex(index + 1);
                setSelectedOption(answers[index + 1]); // Restore the selected option for the next question, if any
            } else {
                alert("You have answered all the questions!!");
            }
        } else {
            showToast('Please select your answer before proceeding.', 'error');
        }
    };
    
    
    
    

    const handleSubmit = async () => {
        console.log("Selected Answers:", answers);

        alert("You have answered all the questions!!");
        // Redirect or perform any action when all questions are answered
        try{
            const resp = await httpClient.post("//localhost:5000/questionnaire" , {
              answer1: answers[0],
              answer2: answers[1],
              answer3: answers[2],
              answer4:answers[3],
              answer5: answers[4],
              answer6: answers[5],
              answer7: answers[6],
              answer8:answers[7],
              answer9: answers[8],
              answer10: answers[9],
              answer11: answers[10],
              answer12:answers[11],
              answer13: answers[12],
              answer14: answers[13],
              answer15: answers[14],
              
            });
      
            window.location.href = "/HTMLDisplay";
      
          }catch(error: any){
            if(error.response && error.response.status === 401){
              alert("Invalid credientials");
            }else {
              console.error("An error occurred while signing up:", error);
              // Handle other types of errors, such as network errors
            }
          }
    };

    const showToast = (message: string, type: 'success' | 'error'): void => {
        if (type === 'success') {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };
    if (!authenticated) {
        return (
            <div className='resultPage'>
                <div className="questionnaire_header">
                    <h2>InvestEase</h2>
                    <Link to="/SignIn"><h3>Login</h3></Link>
                </div>
                <h2 className='error_message'>Please Login!!</h2>
            </div>
        );
      }

    return (
        <>
            <ToastContainer />
            <div className="questionnaire_header">
                <h2>InvestEase</h2>
                <Link to="/Dashboard"><h3>Home</h3></Link>
            </div>

            <div className="questionnaire">
                <div className="quiz-card">
                    <h2>Quiz</h2>
                    <hr />
                    <p>{index + 1}. {data[index].question}</p>
                    <ul>
                        {data[index].options.map((option, idx) => (
                            <li
                                key={idx}
                                className={selectedOption === option ? "selected" : ""}
                                onClick={() => handleAnswerSelection(option, option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    <div className="button-container">
                        <button className="previous-btn" onClick={handlePreviousQuestion} disabled={index === 0}>Previous</button>
                        {index === data.length - 1 ? (
                            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                        ) : (
                            <button className="next-btn" onClick={handleNextQuestion}>Next</button>
                        )}
                    </div>
                    <div className="question-num">{index + 1} out of {data.length} questions</div>
                </div>
            </div>
        </>
    );
};

export default Questionnaire;
