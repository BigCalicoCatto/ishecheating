import { useState } from 'react';

interface Question {
  id: number;
  text: string;
  weight: number;
}

const questions: Question[] = [
  { id: 1, text: 'Does he suddenly care more about his appearance?', weight: 1 },
  { id: 2, text: 'Is he always on his phone, being secretive about it?', weight: 2 },
  { id: 3, text: 'Has he changed his password recently?', weight: 1 },
  { id: 4, text: 'Does he come home late with vague excuses?', weight: 2 },
  { id: 5, text: 'Is he less affectionate with you?', weight: 1 },
  { id: 6, text: 'Does he get defensive when you ask where he\'s been?', weight: 2 },
  { id: 7, text: 'Has his cologne/perfume scent changed?', weight: 1 },
  { id: 8, text: 'Is he working "late" more than usual?', weight: 1 },
  { id: 9, text: 'Does he avoid making eye contact?', weight: 1 },
  { id: 10, text: 'Has his spending suddenly increased?', weight: 1 },
  { id: 11, text: 'Has he created separate social media accounts or hidden his online presence from you?', weight: 4 },
  { id: 12, text: 'Does he have unexplained absences or trips he refuses to discuss in detail?', weight: 4 },
  { id: 13, text: 'Have mutual friends seemed uncomfortable or evasive around you lately?', weight: 4 },
  { id: 14, text: 'Has he suddenly become protective of his phone, wallet, or personal items?', weight: 4 },
  { id: 15, text: 'Does he show signs of guilt (avoiding eye contact, over-explaining, being extra nice)?', weight: 3 },
  { id: 16, text: 'Has his schedule become inconsistent or do his stories about his whereabouts not add up?', weight: 4 },
  { id: 17, text: 'Is he spending significantly more time grooming/working out than before?', weight: 3 },
  { id: 18, text: 'Have you found suspicious evidence (receipts, texts, calls) that he tries to hide?', weight: 5 },
  { id: 19, text: 'Has he become emotionally unavailable and shows no interest in your relationship?', weight: 4 },
  { id: 20, text: 'Do you have concrete proof or strong evidence of infidelity?', weight: 5 },
];

export default function CheatingDetector() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = (): number => {
    let totalWeight = 0;
    let yesWeight = 0;

    questions.forEach((q) => {
      totalWeight += q.weight;
      if (answers[q.id]) {
        yesWeight += q.weight;
      }
    });

    return Math.round((yesWeight / totalWeight) * 100);
  };

  const getResultMessage = (score: number): string => {
    if (score >= 70) return '💔 Major Red Flags... Trust Your Gut';
    if (score >= 50) return '😭 Suspicious Activity Detected';
    if (score >= 30) return '😔 Some Concerns... Watch Closely';
    return '💜 He\'s Probably Just Busy';
  };

  const getResultEmoji = (score: number): string => {
    if (score >= 70) return '🚩🚩🚩';
    if (score >= 50) return '😭😭😭';
    if (score >= 30) return '😔😔😔';
    return '💚💚💚';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a0a1a 0%, #2d0a3d 50%, #1a0a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#e0e0e0',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'rgba(40, 10, 50, 0.9)',
          borderRadius: '20px',
          padding: '40px 24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(200, 50, 150, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(200, 50, 150, 0.2)',
        }}
      >
        {!showResult ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1
                style={{
                  fontSize: '32px',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 'bold',
                }}
              >
                💔 Is He Cheating?
              </h1>
              <p style={{ fontSize: '14px', color: '#b0b0b0', margin: '0' }}>
                Answer honestly...
              </p>
            </div>

            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'rgba(100, 100, 100, 0.3)',
                borderRadius: '10px',
                marginBottom: '24px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #ff6b9d 0%, #c44569 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            <p
              style={{
                fontSize: '12px',
                color: '#a0a0a0',
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              Question {answeredCount + 1} of {questions.length}
            </p>

            <div
              style={{
                backgroundColor: 'rgba(80, 20, 80, 0.4)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '28px',
                border: '1px solid rgba(255, 107, 157, 0.2)',
              }}
            >
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  margin: '0',
                  color: '#f0f0f0',
                  fontWeight: '500',
                }}
              >
                {questions[currentQuestion].text}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <button
                onClick={() => handleAnswer(true)}
                style={{
                  padding: '16px 20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 107, 157, 0.2)',
                  color: '#ff6b9d',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)',
                  border: '2px solid rgba(255, 107, 157, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 107, 157, 0.4)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 107, 157, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                😭 Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                style={{
                  padding: '16px 20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(150, 150, 200, 0.2)',
                  color: '#9696c8',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)',
                  border: '2px solid rgba(150, 150, 200, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(150, 150, 200, 0.4)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(150, 150, 200, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                🤷 No
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '80px',
                  marginBottom: '16px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              >
                {getResultEmoji(score)}
              </div>
              <h2
                style={{
                  fontSize: '28px',
                  marginBottom: '8px',
                  color: score >= 50 ? '#ff6b9d' : '#9696c8',
                  fontWeight: 'bold',
                }}
              >
                {getResultMessage(score)}
              </h2>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(80, 20, 80, 0.4)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid rgba(255, 107, 157, 0.2)',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#a0a0a0', fontSize: '14px', marginBottom: '16px' }}>
                Suspicion Score
              </p>
              <p
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  background:
                    score >= 70
                      ? 'linear-gradient(135deg, #ff3366 0%, #cc0033 100%)'
                      : score >= 50
                        ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)'
                        : score >= 30
                          ? 'linear-gradient(135deg, #ffaa00 0%, #ff7700 100%)'
                          : 'linear-gradient(135deg, #9696c8 0%, #6b68b0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: '0',
                }}
              >
                {score}%
              </p>
            </div>

              <div
                style={{
                  backgroundColor: 'rgba(60, 30, 60, 0.6)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '24px',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#d0d0d0',
                  border: '1px solid rgba(200, 50, 150, 0.2)',
                }}
              >
                {score >= 70 && (
                  <p style={{ margin: '0' }}>
                    🚨 Multiple concerning signs detected. Trust your intuition and consider having an honest conversation. You deserve clarity.
                  </p>
                )}
                {score >= 50 && score < 70 && (
                  <p style={{ margin: '0' }}>
                    ⚠️ Several flags raised. Keep your eyes open and don't ignore your gut feeling. Pay attention to his behavior.
                  </p>
                )}
                {score >= 30 && score < 50 && (
                  <p style={{ margin: '0' }}>
                    🤔 Some signs to be cautious about. It might be worth a conversation to clear things up and ease your mind.
                  </p>
                )}
                {score < 30 && (
                  <p style={{ margin: '0' }}>
                    💜 Great news! The signs suggest he's just busy with his own stuff. Relationships have their natural rhythms—sometimes he's focused on work, friends, or personal goals. That doesn't mean he doesn't care about you. Keep communicating and you two will be just fine.
                  </p>
                )}
              </div>

            <button
              onClick={resetQuiz}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 107, 157, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🔄 Start Over
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
