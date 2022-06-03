const fastify = require("fastify")();
const { data } = require("./p4-data");
const {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer
} = require("./p4-module");

fastify.get("/cit/question", (request, reply) => {
  let replyJSON = {
    error: "",
    statusCode: 200,
    questions: getQuestions(),
  };
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(replyJSON);
});
fastify.get("/cit/question/:number", (request, reply) => {
  let isError = getQuestion(request.query.number).error;
  let queryJSON = {
    error: isError,
    statusCode: isError == "" ? 200 : 404,
    question: getQuestion(request.query.number).question,
    number: getQuestion(request.query.number).number,
  };
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(queryJSON);
});
fastify.post("/cit/question", (request, reply) => {
    const addedObj = addQuestionAnswer(request.body)
    let isError = addedObj.error;
    let replyJSON = {
        error: isError,
        statusCode: isError == "" ? 201 : 400,
        number: addedObj.number
    };
    reply
        .code(replyJSON.statusCode)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(replyJSON);
});
fastify.put("/cit/question", (request, reply) => {
    const edit = updateQuestionAnswer(request.body);
    let isError = edit.error;
    let replyJSON = {
        error: isError,
        statusCode: isError == "" ? 201 : 400,
        number: edit.number
    };
    reply
        .code(replyJSON.statusCode)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(replyJSON);
});
fastify.delete("/cit/question/:number", (request, reply) => {
    const deletion = deleteQuestionAnswer(parseFloat(request.query.number));
    let isError = deletion.error;
    let replyJSON = {
        error: isError,
        statusCode: isError == "" ? 201 : 400,
        number: deletion.number
    };
    reply
        .code(replyJSON.statusCode)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(replyJSON);
});
fastify.get("/cit/answer", (request, reply) => {
  let replyJSON = {
    error: "",
    statusCode: 200,
    answers: getAnswers(),
  };
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(replyJSON);
});
fastify.get("/cit/answer/:number", (request, reply) => {
  let isError = getAnswer(request.query.number).error;
  let queryJSON = {
    error: isError,
    statusCode: isError == "" ? 200 : 404,
    answer: getAnswer(request.query.number).answer,
    number: getAnswer(request.query.number).number,
  };
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(queryJSON);
});
fastify.get("/cit/questionanswer", (request, reply) => {
  let replyJSON = {
    error: "",
    statusCode: 200,
    question_answers: getQuestionsAnswers(),
  };
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(replyJSON);
});
fastify.get("/cit/questionanswer/:number", (request, reply) => {
  let isError = getQuestion(request.query.number).error;
  let queryJSON = {
    error: isError,
    statusCode: isError == "" ? 200 : 404,
    question: getQuestionAnswer(request.query.number).question,
    answer: getQuestionAnswer(request.query.number).answer,
    number: getQuestionAnswer(request.query.number).number,
  };
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(queryJSON);
});
fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>Not Found</h1>");
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
