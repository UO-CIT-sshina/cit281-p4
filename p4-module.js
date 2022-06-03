const {data} = require("./p4-data");

function getQuestions() {
    let final = [];
    for (let index of data) final.push(index.question);
    return final;
}
function getAnswers() {
    let final = [];
    for (let index of data) final.push(index.answer);
    return final;
}
const getQuestionsAnswers = () => data.splice(0);
function getQuestion(number = "") {
    let numberInt = parseFloat(number);
    let output = {error: '', question: '', number: ''};
    if (!Number.isInteger(numberInt)) output.error = 'Question number must be an integer';
    else if (numberInt < 1) output.error = 'Question number must be >= 1';
    else if (numberInt > data.length) output.error = `Question number must be less than the number of questions (${data.length})`;
    else {
        output.question = data[numberInt - 1].question;
        output.number = numberInt;
    }
    return output;
}
function getAnswer(number = "") {
    let numberInt = parseFloat(number);
    let output = {error: '', answer: '', number: ''};
    if (!Number.isInteger(numberInt)) output.error = 'Answer number must be an integer';
    else if (numberInt < 1) output.error = 'Answer number must be >= 1';
    else if (numberInt > data.length) output.error = `Answer number must be less than the number of answers (${data.length})`;
    else {
        output.answer = data[numberInt - 1].answer;
        output.number = numberInt;
    }
    return output;
}
function getQuestionAnswer(number = "") {
    let numberInt = parseFloat(number);
    let output = {error: '', question: '', number: ''};
    if (!Number.isInteger(numberInt)) output.error = 'Question number must be an integer';
    else if (numberInt < 1) output.error = 'Question number must be >= 1';
    else if (numberInt > data.length) output.error = `Question number must be less than the number of questions (${data.length})`;
    else {
        output.question = data[numberInt - 1].question;
        output.number = numberInt;
        output.answer = data[numberInt - 1].answer;
    }
    return output;
}
//Would it be more efficient to combine these three functions, with an extra param for whether it gets the question,answer, or both?
function addQuestionAnswer(info = {}) {
    let output = {
        error: '',
        message: '',
        number: ''
    };
    if (!info.question) output.error = 'Object question property required';
    else if (!info.answer) output.error = 'Object answer property required';
    else {
        data.push(info);
        output.message = 'Question added';
    }
    output.error == '' ? output.number = data.length : output.number = -1;
    return output;
}
function updateQuestionAnswer(info = {}) {
    let output = {
        error: '',
        message: '',
        number: ''
    };
    if (!info.question && !info.answer) output.error = 'Object question property or answer property required';
    else if (getQuestion(info.number).error != '') output.error = 'Object number property must be a valid integer';
    else {
        data[info.number - 1].question = info.question;
        data[info.number - 1].answer = info.answer;
        output.message = `Question ${info.number} updated`;
        output.number = info.number;
    }
    return output;
}
function deleteQuestionAnswer(info = {}) {
    let output = {
        error: '',
        message: '',
        number: ''
    };
    if (!Number.isInteger(info)) output.error = 'Question/answer number must be an integer';
    else if (info < 1) output.error = 'Question/answer number must be >= 1';
    else if (info > data.length) output.error = `Question/answer number must be less than the number of questions (${data.length})`;
    else {
        data.splice(info - 1, 1);
        output.message = `Question ${info} deleted`;
        output.number = info;
    }
    return output;
}

module.exports = {
    getQuestions, getAnswers, getQuestionsAnswers, getQuestion, getAnswer, getQuestionAnswer,
    addQuestionAnswer, updateQuestionAnswer, deleteQuestionAnswer
};

/*****************************
  Module function testing
******************************
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = false;
  const testGetAs = false;
  const testGetQsAs = false;
  const testGetQ = false;
  const testGetA = false;
  const testGetQA = false;
  const testAdd = false;      // Extra credit
  const testUpdate = false;   // Extra credit
  const testDelete = false;   // Extra credit
// getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
  }
  
  // getAnswers()
  if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
  }
  
  // getQuestionsAnswers()
  if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
  }
  
  // getQuestion()
  if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
  }
  
  // getAnswer()
  if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
  }
  
  // getQuestionAnswer()
  if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
  }
  // addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}
// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}
// deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(0)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}*/
