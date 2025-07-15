import { useState } from "react";
import images from './assets/images';
import questionData from './assets/json/questions.json';
import destinationData from './assets/json/destinations.json';

//You are an amazing man. 
// Keep being you. 
// :D //

function Form() {  

  const [answers, setAnswers] = useState(Array(questionData.length).fill(null)) //here ill store the answers
  const [result, setResult] = useState(null) //thats the final result
  const [recommendedCities, setRecommendedCities] = useState([])

  const handleAnswer = (questionIndex, type) => {
    const updatedAnswers = [...answers]
    updatedAnswers[questionIndex] = type
    setAnswers(updatedAnswers)
  }

  const calculateResult = () => {
    const count = {}
    answers.forEach((type) => {
      if (type) {
        count[type] = (count[type] || 0) + 1
      }
    })
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1])
    if (sorted.length > 0) {
      const topType = sorted[0][0]
      setResult(topType)
      setRecommendedCities(destinationData[topType])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (answers.includes(null)) {
      alert("Answer all questions before submitting 😑")
    } else {
      calculateResult()
    }
  }

  return (
    <div className="container">
      <header>
        <img src={images.logo1} alt="Logo" className="logo" />
        <div>
        <h1 className="logotitle">GlobeQuest</h1>
        <p className="tagline">Answer. Discover. Go</p>
        </div>
      </header>
      <main>
        <h1 style={{color: "#0b2d60"}}>Where should you travel?</h1>
        <form onSubmit={handleSubmit}>
          {questionData.map((q, qIndex) => (
            <div key={qIndex} className="questions">
              <h3><strong>{q.question}</strong></h3>
              {q.options.map((opt, optIndex) => (
                <label key={{optIndex}} style={{display: "block", marginBottom: "5px"}}>
                  <input type="radio" name={`question-${qIndex}`} value={opt.type} checked={answers[qIndex] === opt.type } onChange={() => handleAnswer(qIndex, opt.type)} />
                  {" "} {opt.answer}
                </label>
              ))}
            </div>
          ))}

          <button type="submit" style={{padding: "10px 20px", fontSize:'16px'}}>Submit</button>
        </form>
        {result && (
          <div className="result">
            <h3>Recommended destinations:</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
              {recommendedCities.map((city, idx) => (
                <div key={idx} style={{borderRadius: "10px", padding: "10px", textAlign: "center", boxShadow: "0 0 10px rgba(0,0,0,0.3)"}} className= "card">
                  <img 
                    src={images[city.image]} 
                    alt={city.name} 
                    style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }} />
                  <h3 style={{ margin: "10px 0"}}>{city.name}</h3>
                  <p style={{ fontSize: "0.9rem" }}>{city.description}</p>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>
    </div>     
  )                
}

export default Form;  