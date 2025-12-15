import React, { useState, useEffect } from 'react'; // useState 훅을 사용해 투표 상태 관리
import '../styles/vote.css';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
    const navigate = useNavigate();
    

  // 실제 데이터에서는 서버에서 가져오거나 관리할 투표 질문과 옵션
    const voteData = [
        {
        question: "vote1",
        options: [
        { id: 'option1', text: 'option1', votes: 120 },
        { id: 'option2', text: 'option2', votes: 90 },
        { id: 'option3', text: 'option3', votes: 70 },
        { id: 'option4', text: 'option4', votes: 50 },
        ],
        status: "진행중",
    },
    {
        question: "vote2",
        options: [
        { id: 'option1', text: 'option2-1', votes: 120 },
        { id: 'option2', text: 'option2-2', votes: 90 },
        { id: 'option3', text: 'option2-3', votes: 70 },
        { id: 'option4', text: 'option2-4', votes: 50 },
        ],
        status: "진행중",
    },
    {
        question: "vote3",
        options: [
        { id: 'option1', text: 'option3-1', votes: 120 },
        { id: 'option2', text: 'option3-2', votes: 90 },
        { id: 'option3', text: 'option3-3', votes: 70 },
        { id: 'option4', text: 'option3-4', votes: 50 },
        ],
        status: "진행중",
    },
    {
        question: "vote4",
        options: [
        { id: 'option1', text: 'option4-1', votes: 120 },
        { id: 'option2', text: 'option4-2', votes: 90 },
        { id: 'option3', text: 'option4-3', votes: 70 },
        { id: 'option4', text: 'option4-4', votes: 50 },
        ],
        status: "진행중",
    },
    {
        question: "vote5",
        options: [
        { id: 'option1', text: 'option5-1', votes: 120 },
        { id: 'option2', text: 'option5-2', votes: 90 },
        { id: 'option3', text: 'option5-3', votes: 70 },
        { id: 'option4', text: 'option5-4', votes: 50 },
        ],
        status: "투표 종료",
    },
    ];
    const [selectedOption, setSelectedOption] = useState(null); // 사용자가 선택한 옵션
    const [hasVoted, setHasVoted] = useState(false); // 투표 완료 여부 (결과 보여주기 위함)
    const [currentPoll, setCurrentPoll] = useState(null); // 현재 표시할 투표 데이터
    const [showMoreResults, setShowMoreResults] = useState(false);
    


    const selectRandomPoll = () => {
        const activePolls = voteData.filter(poll => poll.status === "진행중");
        if (activePolls.length > 0) {
            const randomIndex = Math.floor(Math.random() * activePolls.length);
            setCurrentPoll(activePolls[randomIndex]);
            setSelectedOption(null);
            setHasVoted(false);
            setShowMoreResults(false);
        } else {
            setCurrentPoll(null);
        }
    };
     const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitVote = () => {
        if (selectedOption) {
        // 여기에 실제 투표 데이터 업데이트 로직 (API 호출 등)을 추가
            const updatedPoll = {...currentPoll};
            const selected = updatedPoll.options.find(option => option.text === selectedOption);
            if (selected) {
                selected.votes += 1;
            }
            setCurrentPoll(updatedPoll);
            console.log(`${currentPoll.question}에 대한 선택: ${selectedOption}`);
            setHasVoted(true);
            setShowMoreResults(false);
        } else {
            alert("투표가 완료되었습니다.");
        }
    };

    const handleViewMorePolls = () => {
        navigate('/polls');
    };

    const handleResetVote= () => {
        setSelectedOption(null); // 선택된 옵션 초기화
        setHasVoted(false);     // 투표 완료 상태 해제 (투표하기 화면으로 돌아감)
        setShowMoreResults(false);
    };

    useEffect(() => {
        selectRandomPoll();
    }, []);

    
    if (!currentPoll) {
        return (
        <>
        
        <div className="vote-section-container">
            <div className="vote-title-container">
                <div className="vote-section-title">지금 진행되고 있는 투표</div>
                <a className="more-button" onClick={handleViewMorePolls}>
                    <span> 더보기 </span>
                    <img alt="arrow" src="https://an2-ast.amz.wtchn.net/ayg/images/icCollectionArrow.fbfce207ca7bb829.svg?url" />
                </a>
            </div>
            <div className="vote-section-section">
                <div className="vote-card">
                <p className="vote-no-poll-message">현재 진행 중인 투표가 없습니다.</p>
                </div>
            </div>
        </div>
        </>
        );
    }

   const totalVotes = currentPoll?.options.reduce((sum, option) => sum + option.votes, 0);
   const displayedOptions = showMoreResults ? currentPoll.options : currentPoll.options.slice(0, 4); 


    
    return (
        <div className="vote-section-container">
            <div className="vote-title-container">
                <div className="vote-section-title">지금 진행되고 있는 투표</div>
                <a className="more-button" onClick={handleViewMorePolls}>
                    <span> 더보기 </span>
                    <img alt="arrow" src="https://an2-ast.amz.wtchn.net/ayg/images/icCollectionArrow.fbfce207ca7bb829.svg?url" />
                </a>
            </div>
            <div className="vote-section-section">
                <div className="vote-card">
                    <p className="vote-question">{currentPoll.question}</p>

                    {!hasVoted ? ( // 투표하기 전
                    <div className="vote-options">
                        {currentPoll.options.map(option => (
                            <label key={option.id} className="vote-option-item">
                                <input
                                    type="radio"
                                    name={`vote-${currentPoll.question}`}
                                    value={option.id} 
                                    checked={selectedOption === option.id}
                                    onChange={handleOptionChange}
                                />
                                {option.text}
                            </label>
                        ))}
                        <button className="vote-button" onClick={handleSubmitVote}>투표</button>
                        
                    </div>
                    ) : ( // 투표 후 결과 보기
                    <div className="vote-results">
                        {displayedOptions.map(option => {
                            const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
                        return (
                            <div key={option.id} className="vote-result-item">
                                <div className="option-text">{option.id}</div>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${percentage}%`, backgroundColor: selectedOption === option.text ? '#4CAF50' : '#2196F3' }}
                                    ></div>
                                    <span className="percentage-text">{percentage}%</span>
                                </div>
                                <span className="vote-count">({option.votes}표)</span>
                                {showMoreResults && option.description && (
                                    <p className="option-description">{option.description}</p>
                                )}
                            </div>
                            );
                        })}
                        <div className="poll-actions-bottom">
                            <button className="vote-button reset-button" onClick={handleResetVote}>
                            다시 투표하기
                            </button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vote;