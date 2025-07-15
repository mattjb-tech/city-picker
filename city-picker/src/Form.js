import { useState } from "react";
import { useEffect } from "react";

import images from './assets/images';
import questionData from './assets/questions.json';
import destinationData from 'destinations.json';


function Form() {
  const questions = [
    {
      question: "Your Perfect Day Off is:",
      options: [
        {answer: "Beach walk", type: "beach"},
        {answer: "Mountain hike", type: "adventure"},
        {answer: "Chill at home", type: "relaxation"},
        {answer: "Museum tour", type: "culture"}
      ]
    },
    {
      question: "Pick a Dream View:",
      options: [
        {answer: "Ocean sunset", type: "beach"},
        {answer: "Jungle and cliffs", type: "adventure"},
        {answer: "Forest cabin", type: "relaxation"},
        {answer: "Old city streets", type: "culture"}
      ]
    },
    {
      question: "Whats a must when you're packing?",
      options: [
        {answer: "Swimsuit", type: "beach"},
        {answer: "Hiking boots", type: "adventure"},
        {answer: "A cozy book", type: "relaxation"},
        {answer: "A camera", type: "culture"}
      ]
    },
    {
      question: "At dinner, you'd like to have:",
      options: [
        {answer: "Grilled seafood", type: "beach"},
        {answer: "Spicy street food", type: "adventure"},
        {answer: "Pasta or soup", type: "relaxation"},
        {answer: "Traditional dishes", type: "culture"}
      ]
    },
    {
      question: "Your travel selfie is:",
      options: [
        {answer: "Beach & sunglasses", type: "beach"},
        {answer: "Jumping off something", type: "adventure"},
        {answer: "Tea and clouds", type: "relaxation"},
        {answer: "With a statue", type: "culture"}
      ]
    },
    {
      question: "Where do you feel most alive?",
      options: [
        {answer: "Near water", type: "beach"},
        {answer: "In the wild", type: "adventure"},
        {answer: "In a quiet place", type: "relaxation"},
        {answer: "In a historic town", type: "culture"}
      ]
    },
  ]

  const destination = {
    beach: [
      {
        name: "Maldives",
        image: images.maldives,
        description: "Crystal clear waters and white sand paradise."
      },
      {
        name: "Bali",
        image: images.bali,
        description: "Tropical vibes, rice terraces, and beaches."
      },
      {
        name: "Santorini",
        image: images.santorini,
        description: "Iconic blue domes and magical sunsets."
      },
      {
        name: "Maui",
        image: images.maui,
        description: "Hawaiian island with lush valleys and volcanoes."
      },
    ],
    adventure: [
      {
        name: "Patagonia",
        image: images.patagonia,
        description: "Mountains, glaciers, and raw nature."
      },
      {
        name: "Queenstown",
        image: images.queenstown,
        description: "New Zealand's adventure capital!"
      },
      {
        name: "Nepal",
        image: images.nepal,
        description: "The gateway to the Himalayas."
      },
      {
        name: "Peru",
        image: images.peru,
        description: "Home to Machu Picchu and jungle treks."
      },
    ],
    relaxation: [
      {
        name: "Kyoto",
        image: images.kyoto,
        description: "Peaceful temples and cherry blossoms."
      },
      {
        name: "Swiss Alps",
        image: images.swiss,
        description: "Breathtaking mountain views and quiet towns."
      },
      {
        name: "Bora Bora",
        image: images.bora,
        description: "Luxury overwater bungalows in paradise."
      },
      {
        name: "Iceland",
        image: images.iceland,
        description: "Waterfalls, glaciers, and silence."
      },
    ],
    culture: [
      {
        name: "Rome",
        image: images.rome,
        description: "Ancient ruins and art everywhere."
      },
      {
        name: "Istanbul",
        image: images.istanbul,
        description: "Where East meets West."
      },
      {
        name: "Jerusalem",
        image: images.jerusalem,
        description: "Spiritual and cultural richness."
      },
      {
        name: "Kyiv",
        image: images.kyiv,
        description: "Vibrant streets and deep history."
      },
    ]
  }
  
  

  const [answers, setAnswers] = useState(Array(questions.length).fill(null)) //here ill store the answers
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
      setRecommendedCities(destination[topType])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (answers.includes(null)) {
      alert("Answer all questios before submitting 😑")
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
          {questions.map((q, qIndex) => (
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
                  <img src={city.image} alt={city.name} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }} />
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

// This is all a component is. It's just a bunch of html items that we stick together. 
// Sometimes we put in js code too, or variables, or hooks, before the return.  