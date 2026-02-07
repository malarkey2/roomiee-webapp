import { WelcomeScreen } from './screens/WelcomeScreen';

function App() {
  const handleNext = () => {
    console.log('Get Started clicked!');
  };

  return <WelcomeScreen onNext={handleNext} />;
}

export default App;
