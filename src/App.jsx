import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { ArrowRight, HelpCircle, Heart, RotateCcw, CheckCircle } from 'lucide-react';
import './App.css';

/* --- 🗺️ THE TREASURE HUNT DATA --- */
const levels = [
  {
    id: 1,
    type: 'choice',
    theme: '🔐 STAGE 1',
    question: "what was one food that all of us bonded over?",
    options: ["Litti Chokha","Spring roll","Paratha"],
    correct: "Spring roll", 
    hint: "Separate tiffin",
  },
  {
    id: 2,
    type: 'choice',
    theme: '💌 STAGE 2',
    question: "where was our hangout spot in school?",
    options: ["FH Library", "AWS", "Washroom", "OPG footpath"],
    correct: "OPG footpath",
    hint: "Kalesh spot",
  },
  {
    id: 3,
    type: 'choice',
    theme: '😂 STAGE 3',
    question: "which teacher used to pick on you a lot in fiitjee",
    options: ["Ankur sir", "Vishakha ma'am","Madhu ma'am"],
    correct: "Ankur sir",
    hint: "Reach to eternity members",
  },
  {
    id: 4,
    type: 'choice',
    theme: '🏏 STAGE 4',
    question: "when was the first time we got thrown out of class together?",
    options: ["PE class", "Maths class", "Hindi class", "English class"],
    correct: "Hindi class",
    hint: "Suprabhat adhyapika ji",
  },
  {
    id: 5,
    type: 'choice',
    theme: '💭 STAGE 5',
    question: "what was the moment when our friendship almost ended?",
    options: ["in class 9th (when u n tanu fought)", "in class 12th (when all three of us fought)","in classroom in 10th during exams"],
    correct: "in class 12th (when all three of us fought)",
    hint: "No hint lol",
  },
];

export default function App() {
  const [page, setPage] = useState('landing'); // landing, rules, game, final
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // New state for smooth transition
  const [inputVal, setInputVal] = useState('');
  
  const level = levels[currentLevel];

  // --- LOGIC HANDLERS ---
  
  const handleStart = () => setPage('rules');
  const handleBeginHunt = () => setPage('game');

  const checkAnswer = (answer) => {
    if (isTransitioning) return; // Prevent double clicking

    let isCorrect = false;

    if (level.type === 'choice') {
      isCorrect = answer === level.correct;
    } else {
      isCorrect = level.correctKeywords.some(keyword => 
        answer.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (isCorrect) {
      setIsWrong(false);
      setIsTransitioning(true); // Trigger transition animation
      
      // Wait 1.5 seconds before moving to next question so she sees she got it right
      setTimeout(() => {
        nextLevel();
      }, 1500);

    } else {
      setIsWrong(true);
    }
  };

  const nextLevel = () => {
    setIsTransitioning(false);
    setInputVal('');
    setIsWrong(false);
    
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setPage('final');
    }
  };

  const restart = () => {
    setPage('landing');
    setCurrentLevel(0);
    setIsTransitioning(false);
    setInputVal('');
  };

  /* --- RENDERERS --- */

  // 1. LANDING PAGE
  if (page === 'landing') return (
    <div className="container landing-bg">
      <div className="card fade-in">
        <h1 className="title">Happy Birthday,<br/>Aahuti 🎂</h1>
        <p className="subtitle">This isn’t just a website.<br/>It’s a little adventure we made just for you.</p>
        <button className="btn-primary" onClick={handleStart}>
          Start the Treasure Hunt 🗺️
        </button>
      </div>
    </div>
  );

  // 2. RULES PAGE
  if (page === 'rules') return (
    <div className="container rules-bg">
      <div className="card fade-in">
        <h2>📜 Rules of the Hunt</h2>
        <ul className="rules-list">
          <li>✨ You’ll get 5 questions.</li>
          <li>❌ Wrong answer = A hint.</li>
          <li>✅ Right answer = Next Question immediately.</li>
          <li>🤫 No Google allowed!</li>
        </ul>
        <button className="btn-primary" onClick={handleBeginHunt}>
          Let’s Begin ✨
        </button>
      </div>
    </div>
  );

  // 3. GAME PLAY (Continuous Questions)
  if (page === 'game') return (
    <div className="container game-bg">
      {/* Show confetti briefly during transition */}
      {isTransitioning && <Confetti recycle={false} numberOfPieces={200} gravity={0.3} />}
      
      <div className={`card ${isTransitioning ? 'fade-out' : 'slide-up'}`}>
        
        {/* Progress Bar */}
        <div className="progress-bar-container">
            <div className="progress-fill" style={{width: `${((currentLevel) / 5) * 100}%`}}></div>
        </div>

        <div className="level-badge">{level.theme}</div>
        
        {isTransitioning ? (
            <div className="success-message">
                <CheckCircle size={50} color="#4cd137" />
                <h2>Correct! 🎉</h2>
            </div>
        ) : (
            <>
                <h2 className="question-text">{level.question}</h2>

                {isWrong && (
                <div className="hint-box shake">
                    <HelpCircle size={16} /> Hint: {level.hint}
                </div>
                )}

                {level.type === 'choice' ? (
                <div className="options-grid">
                    {level.options.map((opt, i) => (
                    <button key={i} className="btn-option" onClick={() => checkAnswer(opt)}>
                        {opt}
                    </button>
                    ))}
                </div>
                ) : (
                <div className="input-group">
                    <input 
                    type="text" 
                    placeholder="Type your answer..." 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer(inputVal)}
                    />
                    <button className="btn-submit" onClick={() => checkAnswer(inputVal)}>
                    <ArrowRight />
                    </button>
                </div>
                )}
            </>
        )}
      </div>
    </div>
  );

  // 4. FINAL SURPRISE PAGE
  if (page === 'final') return (
    <div className="container final-bg">
      <Confetti recycle={true} numberOfPieces={100} />
      <div className="card fade-in">
        <div className="heart-icon"><Heart fill="#ff4d6d" color="#ff4d6d" size={50} /></div>
        <h1>Happy Birthday, Aahuti! 💖</h1>
        <div className="letter-body">
          <p>You answered everything correctly!</p>
          <p>You’re weird, annoying, kind, clueless, strong and deeply loved.</p>
          <p>Never change. ✨</p>
        </div>
        {/* You can add a final group photo here if you want */}
        {/* <img src="URL_HERE" className="final-photo" /> */}
        <button className="btn-secondary" onClick={restart}>
          <RotateCcw size={16} /> Replay
        </button>
      </div>
    </div>
  );
}