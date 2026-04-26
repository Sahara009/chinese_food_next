# TODO: Исправление авторизации и регистрации

- [x] Исправить `src/features/auth/register.ts` — добавить bcrypt.hash, проверку дубля email, улучшить ошибки
- [x] Исправить `src/shared/lib/auth.ts` — session strategy jwt, bcrypt.compare, не возвращать password, session callback
- [x] Исправить `src/shared/lib/actions.ts` — обработка результата signIn, редирект
- [x] Исправить `src/widgets/Header/Header.tsx` — сделать серверным компонентом, использовать auth()
- [x] Исправить `src/app/layout.tsx` — убрать user prop
- [x] Исправить `src/app/auth/registration/page.tsx` — отображение ошибок сервера
- [x] Исправить `src/app/auth/login/page.tsx` — отображение ошибок логина
