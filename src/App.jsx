import React, { useState } from 'react';
import './App.css'; 

const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState('');
  const [tabLabels, setTabLabels] = useState({ tab1: 'Current Level', tab2: 'Course' });
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [scores, setScores] = useState({});
  const [result , setResult]=useState(null);
  const [bonus , setbonus] = useState(null);
  const handleOptionClickTab1 = (option) => {
    setTabLabels(prevLabels => ({ ...prevLabels, tab1: option }));
    setSelectedOption(option);
    setSelectedTab('');
  };

  const handleOptionClickTab2 = (option) => {
    setTabLabels(prevLabels => ({ ...prevLabels, tab2: option }));
    setSelectedCourse(option);
    setSelectedTab('');
  };

  const handleScoreChange = (event, field) => {
    setScores(prevScores => ({ ...prevScores, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    // Define your formulas here
    const formulas = {
      'Maths-1': scores => Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus'],
      'Statistics-1': scores =>Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus'],
      'Computational thinking': scores => Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus'],
      'English-1': scores => Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus'],
      'Maths-2': scores =>Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus'],
      'Statistics-2': scores =>Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus']+1*scores['ExActivityStat-2'],
      'Englist-2': scores => Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus'],
      'Python': scores =>  0.4*scores['endterm']+ 0.25*Math.max(scores['oppe1'], scores['oppe2']) + 0.15*Math.min(scores['oppe1'], scores['oppe2']) + 0.1*scores['ga']+1*scores['bonus']+0.1*scores['quiz1']+1*scores['python timed'],
      'MLF': scores => Math.max(0.6*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.3*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus'],
      'BDM': scores => 0.3*scores['endterm']+0.7*scores['ga'],
      'BA' : scores => 0.14*Math.max(scores['quiz1'], scores['quiz2']) + 0.6*Math.min(scores['quiz1'], scores['quiz2'])+0.4*scores['ga']+0.4*scores['endterm'],
      'DBMS': scores => Math.max(0.15*Math.max(scores['quiz1'] , scores['quiz2']) + 0.45* scores['endterm'] , 0.4*scores['endterm']+0.1*scores['quiz1']+ 0.2*scores['quiz2'] )+ 0.2 * scores['oppe1'] + 0.1 * scores['ga'] + 1*scores['bonus'],
      'MAD-1': scores => Math.max(0.3*Math.max(scores['quiz1'] , scores['quiz2']) + 0.4* scores['endterm'] , 0.35*scores['endterm']+0.2*scores['quiz1']+ 0.25*scores['quiz2'] )+ 0.2*scores['ga'] + 1*scores['bonus'],
      'MAD-2': scores => Math.max(0.3*Math.max(scores['quiz1'] , scores['quiz2']) + 0.4* scores['endterm'] , 0.35*scores['endterm']+0.2*scores['quiz1']+ 0.25*scores['quiz2'] )+ 0.2*scores['ga'] + 1*scores['bonus'],
      'JAVA': scores =>  Math.max(0.3*scores['endterm']+ 0.25*Math.max(scores['quiz1'], scores['quiz2']) , 0.3*scores['endterm']+0.15*scores['quiz1']+0.25*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus']+0.2*Math.max(scores['oppe1'], scores['oppe2'])+0.1*Math.min(scores['oppe1'], scores['oppe2']),
      'MLP': scores =>  Math.max(0.3*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.3*scores['endterm']+0.15*scores['quiz1']+0.15*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus']+Math.max(0.2*Math.max(scores['oppe1'], scores['oppe2']) , 0.15*scores['oppe1'] + 0.15*scores['oppe2']),
      'MLT': scores => Math.max(0.4*scores['endterm']+ 0.3*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.2*scores['quiz1']+0.2*scores['quiz2'])+0.2*scores['ga']+1*scores['bonus'],
      'SC': scores =>  Math.max(0.3*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.3*scores['endterm']+0.15*scores['quiz1']+0.15*scores['quiz2'])+0.06*scores['ga']+1*scores['bonus']+0.15*scores['oppe1']+0.2*scores['oppe2']+1*scores['nppe1+2 sc']+1*scores['Vmtask for sc'],
      'PDSA': scores =>  Math.max(0.4*scores['endterm']+ 0.2*Math.max(scores['quiz1'], scores['quiz2']) , 0.4*scores['endterm']+0.15*scores['quiz1']+0.15*scores['quiz2'])+0.1*scores['ga']+1*scores['bonus']+0.20*scores['oppe1'],
      'TDS': scores => 0.3*scores['endterm']+0.2*scores['oppe1']+0.2*scores['oppe2']+0.2*scores['Roe Tds']+0.1*scores['ga'],
      // Add more formulas for other courses
    };

    const formula = formulas[selectedCourse];
    if (formula) {
      let result = formula(scores);
      result=Math.round(result);
      setResult(result);
      setbonus(scores['bonus']);
    }
  };

  const getGrade = (marks, bonus) => {
    marks=Math.round(marks);
    if (marks-bonus <40  ){
      return 'I , Total Score without bonus < 40 ';
    }
    if (marks >= 90) {
      return 'S';
    }
    else if (marks<90 && marks >=80 ){
      return 'A';
    }
    else if (marks<80 && marks >=70 ){
      return 'B';
    }
    else if (marks <70 && marks >=60){
      return 'C';
    }
    else if (marks<60 && marks>=50){
      return 'D';
    }
    else if (marks<50 && marks>=40){
      return 'E'
    }
  
    
  };

  const coursesFoundation = ['Maths-1', 'Statistics-1', 'Computational thinking', 'English-1', 'Maths-2', 'Python', 'Statistics-2', 'English-2'];
  const coursesDiploma = ['MLT', 'MAD-1', 'BDM', 'MLF', 'BA', 'PDSA', 'TDS', 'DBMS', 'JAVA', 'MAD-2', 'SC', 'MLP'];
  const courses = selectedOption === 'Foundation' ? coursesFoundation : coursesDiploma;

  const fields = ['quiz1', 'quiz2', 'endterm', 'oppe1', 'oppe2', 'ga', 'bonus' ,'Vmtask for sc' , 'Roe Tds', 'ExActivityStat-2' , 'nppe1+2 sc', 'python timed']; // Named fields

  return (
    
    <div className="w-full max-w-md mx-auto ">
       <header className="bg-indigo-500 text-white text-center py-4 mt-4">
      <h1 className="text-3xl font-bold">IITM BS Score Calculator</h1>
    </header>
      <div className="bg-white shadow-md rounded my-6 mx-2">
        <div className="tab w-full overflow-hidden border-t">
          <label className="block p-5 leading-normal cursor-pointer" onClick={() => setSelectedTab('tab1')}>{tabLabels.tab1}</label>
          {selectedTab === 'tab1' && (
            <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
              <p className="p-5">
                <button className="option-button" onClick={() => handleOptionClickTab1('Foundation')}>Foundation</button>
                <button className="option-button" onClick={() => handleOptionClickTab1('Diploma')}>Diploma</button>
              </p>
            </div>
          )}
        </div>
        <div className="tab w-full overflow-hidden border-t">
          <label className="block p-5 leading-normal cursor-pointer" onClick={() => setSelectedTab('tab2')}>{tabLabels.tab2}</label>
          {selectedTab === 'tab2' && (
            <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
              <p className="p-5">
                {courses.map(course => (
                  <button className="option-button" onClick={() => handleOptionClickTab2(course)} key={course}>{course}</button>
                ))}
              </p>
            </div>
          )}
        </div>
        {selectedCourse && (
          <div className="score-inputs">
            {fields.map(field => (
              <input
              className="text-1.5xl font-bold mx-2 my-2 "
                key={field}
                type="text"
                pattern="[0-9]*"
                placeholder={field}
                value={scores[field] || ''}
                onChange={(event) => handleScoreChange(event, field)}
              />
            ))}
            <button className="w-60 h-12 ml-24 mb-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md border border-indigo-800 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-200" onClick={handleSubmit}>
            Submit
           </button>

          </div>
        )}
        {result && (
          <div className="result">
            <p className="font-bold text-2xl text-green-600">Score: {result}</p>
            <p className="font-bold text-xl text-blue-700">Grade: {getGrade(result,bonus)}</p>

          </div>
        )}

     <footer className="bg-indigo-700 text-white text-center py-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          <p className="text-md ml-2 mr-2">
           1. Put the scores for the fields your course has.
           <br></br>
           2.For Tds put your p1 and p2 score in oppe1 and oppe2
           <br></br>
           3. Even if you put some value in a field that your course does not have it will still calculate the right score.
           <br></br>
           4. For vm task put score out of 10 , for nppe out of 4 , for python timed mock out of 5 ,for bonus out of 5 , extraActivity out of 10. For the rest put the score out of 100
           <br></br>
           5.It does not cover passing criteria accor. to Oppe scores yet.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Contact Us:</h2>
          <p className="text-sm mb-4">For any queries related to the site, please contact us:</p>
          
          <div className="bg-gray-200 p-4 text-center">
          
           <p className="text-sm">
             <a href={`mailto:adityakumariit78@gmail.com`} className="text-blue-500 underline">
             adityakumariit78@gmail.com
             
        </a>
      </p>
    </div>
        </div>
        <p className='text-sm '>Created by Aditya Kumar</p>
        <p className="text-sm">&copy; 2023 IITM BS Score Calculator. All rights reserved.</p>
      </div>
    </footer>
      </div>
    </div>
  );
};

export default TabComponent;
