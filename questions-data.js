// questions-data.js - نسخة محسنة مع أسئلة حقيقية للأولمبياد
window.QUESTIONS_BANK = (function() {
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    function shuffleOptions(q) {
        const orig = q.options[q.correct];
        const shuffled = shuffleArray([...q.options]);
        const newCorrect = shuffled.indexOf(orig);
        return { ...q, options: shuffled, correct: newCorrect };
    }

    const allQuestions = [];

    // دالة إضافة أسئلة حقيقية للأولمبياد
    function addRealOlympiadQuestions() {
        // الفئة: olympiad_juniors - science
        for (let i = 1; i <= 10; i++) {
            allQuestions.push({
                category: 'olympiad_juniors',
                subject: 'science',
                model: 'model1',
                text: `علوم (جونيور) النموذج1 س${i}: ما العنصر الأكثر وفرة في الغلاف الجوي؟`,
                options: ['الأكسجين', 'النيتروجين', 'ثاني أكسيد الكربون', 'الأرجون', 'الهيدروجين'],
                correct: 1,
                explanation: 'النيتروجين 78%',
                image: null
            });
            allQuestions.push({
                category: 'olympiad_juniors',
                subject: 'science',
                model: 'model2',
                text: `علوم (جونيور) النموذج2 س${i}: أي كوكب يسمى الكوكب الأحمر؟`,
                options: ['المشتري', 'المريخ', 'الزهرة', 'زحل', 'عطارد'],
                correct: 1,
                explanation: 'المريخ لونه أحمر بسبب أكسيد الحديد',
                image: null
            });
            allQuestions.push({
                category: 'olympiad_juniors',
                subject: 'science',
                model: 'model3',
                text: `علوم (جونيور) النموذج3 س${i}: ما سرعة الصوت في الهواء؟`,
                options: ['300 م/ث', '340 م/ث', '400 م/ث', '250 م/ث', '500 م/ث'],
                correct: 1,
                explanation: 'حوالي 340 متر/ثانية',
                image: null
            });
            allQuestions.push({
                category: 'olympiad_juniors',
                subject: 'science',
                model: 'general',
                text: `علوم (جونيور) عام س${i}: ما هو الجهاز المسؤول عن ضخ الدم؟`,
                options: ['القلب', 'الكبد', 'الرئتان', 'المعدة', 'الكلى'],
                correct: 0,
                explanation: 'القلب يضخ الدم',
                image: null
            });
        }
        // الفئة: olympiad_juniors - math (مشابه)
        for (let i = 1; i <= 10; i++) {
            allQuestions.push({
                category: 'olympiad_juniors',
                subject: 'math',
                model: 'model1',
                text: `رياضيات (جونيور) النموذج1 س${i}: ما ناتج ${i*2} × ${i+3}؟`,
                options: [`${(i*2)*(i+3)-2}`, `${(i*2)*(i+3)-1}`, `${(i*2)*(i+3)}`, `${(i*2)*(i+3)+1}`, `${(i*2)*(i+3)+2}`],
                correct: 2,
                explanation: `الناتج هو ${(i*2)*(i+3)}`,
                image: null
            });
            // أضف النماذج الأخرى بنفس المنطق...
        }
    }

    // استدعاء الدالة لتوليد الأسئلة الحقيقية
    addRealOlympiadQuestions();

    // يمكنك إضافة دوال مماثلة للصف التاسع والمتفوقين...

    // دوال الاستعلام (كما هي)
    function getQuestionsForQuiz(quizId) {
        const parts = quizId.split('_');
        if (parts.length < 3) return [];
        const category = parts[0];
        const subject = parts[1];
        const modelPart = parts.slice(2).join('_');
        if (modelPart === 'random') {
            let combined = [];
            for (let m of ['model1', 'model2', 'model3', 'general']) {
                let filtered = allQuestions.filter(q => q.category === category && q.subject === subject && q.model === m);
                combined.push(...filtered);
            }
            return shuffleArray(combined);
        } else {
            let filtered = allQuestions.filter(q => q.category === category && q.subject === subject && q.model === modelPart);
            if (filtered.length === 0) {
                filtered = allQuestions.filter(q => q.category === category && q.subject === subject && q.model === 'general');
            }
            return shuffleArray(filtered);
        }
    }

    function getRandomQuestionsByCategory(category, limit = 30) {
        let filtered = allQuestions.filter(q => q.category === category);
        filtered = shuffleArray(filtered);
        return filtered.slice(0, limit);
    }

    function prepareQuestions(questions) {
        let shuffled = shuffleArray([...questions]);
        return shuffled.map(q => shuffleOptions(q));
    }

    return {
        getQuestionsForQuiz,
        getRandomQuestionsByCategory,
        prepareQuestions
    };
})();