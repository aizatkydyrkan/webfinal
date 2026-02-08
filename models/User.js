const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Исправленная версия: без параметра next
userSchema.pre('save', async function() {
    // Если пароль не был изменен, выходим из функции
    if (!this.isModified('password')) {
        return; 
    }

    // Хешируем пароль
    // В async функции Mongoose сам обработает ошибки, если они возникнут
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // next() вызывать НЕ НУЖНО
});

module.exports = mongoose.model('User', userSchema);