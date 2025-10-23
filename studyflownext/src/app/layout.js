import './globals.css';
import Header from '../../src/app/components/Header';
import Footer from '../../src/app/components/Footer';



export const metadata = {
  title: 'StudyFlow - Dashboard',
  description: 'Seu espaço de estudos produtivo.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}