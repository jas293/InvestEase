import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import httpClient from "../httpClient";



const Questionnaire: React.FC = () => {

    // Define state variables for each question
    const [selectedAnswer1, setSelectedAnswer1] = useState(null);
    const [selectedAnswer2, setSelectedAnswer2] = useState(null);
    const [selectedAnswer3, setSelectedAnswer3] = useState(null);
    const [selectedAnswer4, setSelectedAnswer4] = useState(null);

    /*// Function to handle selection of an option for each question
    const handleOptionSelect1 = (option) => {
        setSelectedAnswer1(option);
    };

    const handleOptionSelect2 = (option) => {
        setSelectedAnswer2(option);
    };

    const handleOptionSelect3 = (option) => {
        setSelectedAnswer3(option);
    };

    const handleOptionSelect4 = (option) => {
        setSelectedAnswer4(option);
    };*/
    

    // Function to handle selection of an option for each question
    const handleOptionSelect = (questionNumber, option) => {
        switch (questionNumber) {
            case 1:
                setSelectedAnswer1(option);
                break;
            case 2:
                setSelectedAnswer2(option);
                break;
            case 3:
                setSelectedAnswer3(option);
                break;
            case 4:
                setSelectedAnswer4(option);
                break;
            default:
                break;
        }
    };

    /*// Define state variables for each question
    const [answers, setAnswers] = useState({
        question1: null,
        question2: null,
        question3: null,
        question4: null
    });

    const handleOptionSelect = (questionNumber, option) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionNumber]: option
        }));
    };
    */

     // Function to handle submission of the selected answers
     const handleSubmit = async () => {
        // You can submit the selected answers to the server or perform any other action here
        console.log('Selected Answers:', selectedAnswer1, '\n' , selectedAnswer2 , '\n' , selectedAnswer3 , '\n' , selectedAnswer4);
    

    // TODO: Proceed with the signup process (e.g., sending data to an API)

    try{
        const resp = await httpClient.post("//localhost:5000/questionnaire" , {
          answer1: selectedAnswer1,
          answer2: selectedAnswer2,
          answer3: selectedAnswer3,
          answer4:selectedAnswer4,
        });
  
        window.location.href = "/LandingPage";
  
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
                <form action="#" className="question-form">
                <div className="question-1">
                        <h4>Question 1: How soon do you anticipate needing access to the money you invest?</h4>
                        <label>
                            <input 
                                type="radio" 
                                name="question1" 
                                value="Less than 1 year" 
                                onChange={() => handleOptionSelect(1, 'Less than 1 year')}
                                checked={selectedAnswer1 === 'Less than 1 year'}
                            />
                            Less than 1 year
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question1" 
                                value="1 to 3 years" 
                                onChange={() => handleOptionSelect(1, '1 to 3 years')}
                                checked={selectedAnswer1 === '1 to 3 years'}
                            />
                            1 to 3 years
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question1" 
                                value="4 to 7 years" 
                                onChange={() => handleOptionSelect(1, '4 to 7 years')}
                                checked={selectedAnswer1 === '4 to 7 years'}
                            />
                            4 to 7 years
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question1" 
                                value="More than 7 years" 
                                onChange={() => handleOptionSelect(1, 'More than 7 years')}
                                checked={selectedAnswer1 === 'More than 7 years'}
                            />
                            More than 7 years
                        </label>
                    </div>

                    {/* Repeat the above pattern for Question 2, Question 3, and Question 4 */}
                    
                     Question 2 
                    <div className="question-2">
                        <h4>How comfortable are you with the potential for your investments to lose value in the short term?</h4>
                        <label>
                            <input 
                                type="radio" 
                                name="question2" 
                                value="I am very uncomfortable and would prefer to avoid any potential losses." 
                                onChange={() => handleOptionSelect(2, 'I am very uncomfortable and would prefer to avoid any potential losses.')}
                                checked={selectedAnswer2 === 'I am very uncomfortable and would prefer to avoid any potential losses.'}
                            />
                            I am very uncomfortable and would prefer to avoid any potential losses.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question2" 
                                value="I am somewhat uncomfortable but willing to accept some risk for potentially higher returns." 
                                onChange={() => handleOptionSelect(2, 'I am somewhat uncomfortable but willing to accept some risk for potentially higher returns.')}
                                checked={selectedAnswer2 === 'I am somewhat uncomfortable but willing to accept some risk for potentially higher returns.'}
                            />
                            I am somewhat uncomfortable but willing to accept some risk for potentially higher returns.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question2" 
                                value="I am comfortable with moderate fluctuations and understand the potential for short-term losses." 
                                onChange={() => handleOptionSelect(2, 'I am comfortable with moderate fluctuations and understand the potential for short-term losses.')}
                                checked={selectedAnswer2 === 'I am comfortable with moderate fluctuations and understand the potential for short-term losses.'}
                            />
                            I am comfortable with moderate fluctuations and understand the potential for short-term losses.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question2" 
                                value="I am comfortable with significant fluctuations and prioritize the potential for high returns, even if it means accepting higher risk." 
                                onChange={() => handleOptionSelect(2, 'I am comfortable with significant fluctuations and prioritize the potential for high returns, even if it means accepting higher risk.')}
                                checked={selectedAnswer2 === 'I am comfortable with significant fluctuations and prioritize the potential for high returns, even if it means accepting higher risk.'}
                            />
                            I am comfortable with significant fluctuations and prioritize the potential for high returns, even if it means accepting higher risk.
                        </label><br />
                        
                    </div>
                    
                    Question 3
                    <div>
                        <h4>Question 3: How would you describe your overall financial situation?</h4>
                        <label>
                            <input 
                                type="radio" 
                                name="question3" 
                                value="I have limited savings and significant debt." 
                                onChange={() => handleOptionSelect(3, 'I have limited savings and significant debt.')}
                                checked={selectedAnswer3 === 'I have limited savings and significant debt.'}
                            />
                            I have limited savings and significant debt.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question3" 
                                value="I have some savings and manageable debt." 
                                onChange={() => handleOptionSelect(3, 'I have some savings and manageable debt.')}
                                checked={selectedAnswer3 === 'I have some savings and manageable debt.'}
                            />
                            I have some savings and manageable debt.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question3" 
                                value="I have a comfortable savings cushion and no significant debt." 
                                onChange={() => handleOptionSelect(3, 'I have a comfortable savings cushion and no significant debt.')}
                                checked={selectedAnswer3 === 'I have a comfortable savings cushion and no significant debt.'}
                            />
                            I have a comfortable savings cushion and no significant debt.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question3" 
                                value="I have a substantial amount of savings and financial security." 
                                onChange={() => handleOptionSelect(3, 'I have a substantial amount of savings and financial security.')}
                                checked={selectedAnswer3 === 'I have a substantial amount of savings and financial security.'}
                            />
                            I have a substantial amount of savings and financial security.
                        </label><br />
                        
                    </div>

                    Question 4
                    <div>
                        <h4>Question 4: Which statement best describes your approach to financial decisions?</h4>
                        <label>
                            <input 
                                type="radio" 
                                name="question4" 
                                value="I prioritize safety and security above all else, even if it means lower potential returns." 
                                onChange={() => handleOptionSelect(4, 'I prioritize safety and security above all else, even if it means lower potential returns.')}
                                checked={selectedAnswer4 === 'I prioritize safety and security above all else, even if it means lower potential returns.'}
                            />
                            I prioritize safety and security above all else, even if it means lower potential returns.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question4" 
                                value="I prefer a balanced approach, considering both risk and potential reward." 
                                onChange={() => handleOptionSelect(4, 'I prefer a balanced approach, considering both risk and potential reward.')}
                                checked={selectedAnswer4 === 'I prefer a balanced approach, considering both risk and potential reward.'}
                            />
                            I prefer a balanced approach, considering both risk and potential reward.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question4" 
                                value="I am willing to take some calculated risks for the chance of higher returns." 
                                onChange={() => handleOptionSelect(4, 'I am willing to take some calculated risks for the chance of higher returns.')}
                                checked={selectedAnswer4 === 'I am willing to take some calculated risks for the chance of higher returns.'}
                            />
                            I am willing to take some calculated risks for the chance of higher returns.
                        </label><br />
                        <label>
                            <input 
                                type="radio" 
                                name="question4" 
                                value="I am comfortable with significant risk for the potential of maximizing my returns." 
                                onChange={() => handleOptionSelect(4, 'I am comfortable with significant risk for the potential of maximizing my returns.')}
                                checked={selectedAnswer4 === 'I am comfortable with significant risk for the potential of maximizing my returns.'}
                            />
                            I am comfortable with significant risk for the potential of maximizing my returns.
                        </label><br />
                       
                    </div>
                    
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </form>
                
            </div>
        </>
    )
}
export default Questionnaire