"use client";

import { Title } from "@/src/shared/ui/Title/Title";

const AboutPage = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Заголовок */}
      <div className="text-center space-y-4 animate-fade-in">
        <Title
          size="xl"
          className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
        >
          О нашем проекте
        </Title>

        <p className="text-gray-600 text-lg">
          Мы делимся аутентичными китайскими рецептами и помогаем открыть новые
          вкусы прямо у себя дома.
        </p>
      </div>

      {/* Блоки */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Карточка 1 */}
        <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1 animate-fade-in">
          <h3 className="text-xl font-semibold mb-3">🥡 Настоящие рецепты</h3>
          <p className="text-gray-500 leading-relaxed">
            Мы собираем рецепты, вдохновлённые традиционной китайской кухней —
            от уличной еды до домашних блюд.
          </p>
        </div>

        {/* Карточка 2 */}
        <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1 animate-fade-in delay-100">
          <h3 className="text-xl font-semibold mb-3">🍜 Простые шаги</h3>
          <p className="text-gray-500 leading-relaxed">
            Даже сложные блюда становятся понятными благодаря пошаговым
            инструкциям.
          </p>
        </div>

        {/* Карточка 3 */}
        <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1 animate-fade-in delay-200">
          <h3 className="text-xl font-semibold mb-3">🌏 Культура вкуса</h3>
          <p className="text-gray-500 leading-relaxed">
            Китайская кухня — это не просто еда, а история, традиции и
            философия.
          </p>
        </div>

        {/* Карточка 4 */}
        <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1 animate-fade-in delay-300">
          <h3 className="text-xl font-semibold mb-3">❤️ Для любителей еды</h3>
          <p className="text-gray-500 leading-relaxed">
            Этот проект создан для тех, кто любит готовить и открывать новое.
          </p>
        </div>
      </div>

      {/* Финальный блок */}
      <div className="text-center max-w-2xl mx-auto animate-fade-in delay-500">
        <p className="text-gray-700 text-lg">
          Готовьте, экспериментируйте и наслаждайтесь вкусами Китая 🍜
        </p>
      </div>

      {/* Анимации */}
      <style jsx>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeIn 0.6s ease forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutPage;
