import { useState } from "react";
import NavBar from "../../components/navigation/nav_bar";
import SearchBar from "../../components/buttons/search_bar";
import { useNavigate } from "react-router-dom";

const DiscussionHome = () => {
  const [isGeneralButtonClicked, setIsGeneralButtonClicked] = useState(true);
  const [isVoteClicked, setIsVoteClicked] = useState(false);
  const [question, setQuestion] = useState({
    title: "How to use React Hooks ?",
    voteCount: 15,
    answersCount: 5,
    category: "React",
    askedTime: "2 hours ago",
    askedUser: {
      name: "John Doe",
      profilePhoto: "assets/images/image1.jpg",
    },
  });

  const handleVote = () => {
    setIsVoteClicked(!isVoteClicked);
    if (isVoteClicked) {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        voteCount: prevQuestion.voteCount - 1,
      }));
    } else {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        voteCount: prevQuestion.voteCount + 1,
      }));
    }
  };

  return (
    <div className="container mx-auto space-y-2">
      <NavBar />
      <SearchBar placeholder="Search Questions..." />
      <FilterQuestionOptions />
      <div className="flex space-x-4 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsGeneralButtonClicked(true)}
        >
          General
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsGeneralButtonClicked(false)}
        >
          Error
        </button>
      </div>

      <div className="space-y-2">
        {[1, 2, 3, 4].map((q, index) => (
          <QuestionModal
            question={question}
            key={index}
            handleVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
};

const QuestionModal = ({ question, handleVote }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-md shadow-md hover:cursor-pointer" onClick={() => navigate("/question_details", {state: {question}})}>
      {/* Question Section */}
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>

      {/* user details */}
      <div className="flex items-center justify-between text-gray-500">
        <section className="flex justify-center items-center space-x-2">
          <img
            src={question.askedUser.profilePhoto}
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <span>{question.askedUser.name}</span>
        </section>
        <time>{question.askedTime}</time>
      </div>

      {/* vote and Answer Count */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div
          className="flex flex-col justify-center items-center hover:cursor-pointer"
          onClick={handleVote}
        >
          <p className="text-gray-600">{question.voteCount}</p>
          <span>Votes</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-600">{question.answersCount}</p>
          <span>Answers</span>
        </div>
        {/* Category */}
        <p className=" text-gray-600 bg-slate-300 p-1 rounded-lg">
          {question.category}
        </p>
      </div>
    </div>
  );
};

const FilterQuestionOptions = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    onFilterChange(selectedFilter);
  };

  return (
    <div className="flex justify-center space-x-4">
      {/* Filter by Unanswered or Answers */}
      <div>
        <input
          type="text"
          id="filterOptions"
          className="w-full p-2 border rounded-md outline-none focus:border-blue-500"
          placeholder="Question status..."
          list="filterOptionsList"
          onChange={handleFilterChange}
        />
        <datalist id="filterOptionsList">
          <option value="Unanswered" />
          <option value="Answered" />
        </datalist>
      </div>

      {/* Asked Date */}
      <div className="">
        <input
          type="text"
          id="askedDate"
          className="w-full p-2 border rounded-md outline-none focus:border-blue-500"
          placeholder="Asked time..."
          list="askedDateOptionsList"
          onChange={handleFilterChange}
        />
        <datalist id="askedDateOptionsList">
          <option value="Any Time" />
          <option value="Past 24 Hours" />
          <option value="Past 1 Month" />
        </datalist>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded space-x-2">
        <i className="fa-solid fa-filter"></i>
        <span>Filter</span>
      </button>
    </div>
  );
};

export default DiscussionHome;
