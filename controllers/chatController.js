const Chat = require('../models/chatModel');

// Cria mensagem
exports.createMessage = async (req, res, fields) => {
  const { sender, receiver, message } = fields || req.body;
  if (!sender || !receiver || !message) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Remetente, destinatário e mensagem são obrigatórios.' }));
  }
  try {
    const chat = new Chat({ sender, receiver, message });
    await chat.save();
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(chat));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Erro interno ao enviar mensagem.' }));
  }
};

//Lista mensagens
const listMessages = async (req, res) => {
    try {
        const messages = await Chat.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(messages));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro ao listar mensagens.' }));
    }
};

// Exclui mensagem
const deleteMessage = async (req, res) => {
    const messageId = req.url.split('/').pop();
    try {
        await Chat.findByIdAndDelete(messageId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Mensagem excluída com sucesso' }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro ao excluir mensagem' }));
    }
};

module.exports = { createMessage, listMessages, deleteMessage };