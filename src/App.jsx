import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { ArrowRight, HelpCircle, Heart, RotateCcw, CheckCircle, X, PlayCircle } from 'lucide-react';
import './App.css';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg';
import img6 from './assets/img6.jpg';
import img7 from './assets/img7.jpg';
import img8 from './assets/img8.jpg';
import img9 from './assets/img9.jpg';
import img10 from './assets/img10.jpg';
import img11 from './assets/img11.jpg';
import img12 from './assets/img12.jpg';
import img13 from './assets/img13.jpg';
import img14 from './assets/img14.jpg';
import img15 from './assets/img15.jpg';
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

/* --- 📸 YOUR MEMORIES (Add your URLs here) --- */
const memories = [
  { type: 'image', src: img1, caption: "1" },
    { type: 'image', src: img2, caption: "2" },
  { type: 'image', src: img3, caption: "3" },
  { type: 'image', src: img4, caption: "4" },
  { type: 'image', src: img5, caption: "5" },
  { type: 'image', src: img6, caption: "6" },
  { type: 'image', src: img7, caption: "7" },
  { type: 'image', src: img8, caption: "8" },
  { type: 'image', src: img9, caption: "9" },
  { type: 'image', src: img10, caption: "10" },
  { type: 'image', src: img11, caption: "11" },
  { type: 'image', src: img12, caption: "12" },
  { type: 'image', src: img13, caption: "13" },
  { type: 'image', src: img14, caption: "14" },
  { type: 'image', src: img15, caption: "15" },
];

export default function App() {
  const [page, setPage] = useState('landing'); // landing, rules, game, final
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); 
  const [inputVal, setInputVal] = useState('');
  
  // New State for Gallery Lightbox
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  const level = levels[currentLevel];

  // --- LOGIC HANDLERS ---
  
  const handleStart = () => setPage('rules');
  const handleBeginHunt = () => setPage('game');

  const checkAnswer = (answer) => {
    if (isTransitioning) return; 

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
      setIsTransitioning(true); 
      
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
    setSelectedMedia(null);
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

  // 3. GAME PLAY 
  if (page === 'game') return (
    <div className="container game-bg">
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

  // 4. FINAL SURPRISE PAGE (Updated with Gallery)
  if (page === 'final') return (
    <div className="container final-bg final-layout">
      <Confetti recycle={true} numberOfPieces={100} />
      
      {/* Top Message Card */}
      <div className="card fade-in final-card-header">
        <div className="heart-icon"><Heart fill="#ff4d6d" color="#ff4d6d" size={50} /></div>
        <h1>Happy Birthday, Aahuti! 💖</h1>
        <div className="letter-body">
          <p>You answered everything correctly!</p>
          <p>You’re weird, annoying, kind, clueless, strong and deeply loved.</p>
          <p>Here are some of our best memories 👇</p>
        </div>
        <button className="btn-secondary" onClick={restart}>
          <RotateCcw size={16} /> Replay
        </button>
      </div>

      {/* 📸 Memory Gallery Section */}
      <div className="gallery-grid fade-in-delayed">
        {memories.map((item, index) => (
          <div key={index} className="gallery-item" onClick={() => setSelectedMedia(item)}>
            {item.type === 'video' ? (
               <div className="video-thumbnail">
                 <PlayCircle size={40} color="white" className="play-icon" />
                 <video src={item.src} className="thumb-media" muted />
               </div>
            ) : (
              <img src={item.src} alt="memory" className="thumb-media" />
            )}
            <div className="hover-caption">{item.caption}</div>
          </div>
        ))}
      </div>

      {/* 🕶️ Lightbox Overlay (Full Screen View) */}
      {selectedMedia && (
        <div className="lightbox-overlay" onClick={() => setSelectedMedia(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMedia(null)}>
              <X size={30} />
            </button>
            
            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.src} controls autoPlay className="full-media" />
            ) : (
              <img src={selectedMedia.src} alt="Full memory" className="full-media" />
            )}
            <p className="lightbox-caption">{selectedMedia.caption}</p>
          </div>
        </div>
      )}

    </div>
  );
}