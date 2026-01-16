import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Target, Heart, Code, Zap, Star } from 'lucide-react';

const HustleCodeLanding = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [typewriterText, setTypewriterText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const messages = [
    'Join us on a transformative journey',
    'From struggle to digital empire',
    'Shape our collective destiny together'
  ];

  useEffect(() => {
    const typeSpeed = isTyping ? 80 : 40;
    const pauseTime = isTyping ? 1500 : 400;

    const timer = setTimeout(() => {
      if (isTyping) {
        if (charIndex < messages[messageIndex].length) {
          setTypewriterText(messages[messageIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsTyping(false), pauseTime);
        }
      } else {
        if (charIndex > 0) {
          setTypewriterText(messages[messageIndex].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setMessageIndex((messageIndex + 1) % messages.length);
          setIsTyping(true);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, messageIndex, isTyping]);

  const tabs = [
    { id: 'concept', label: 'Concept', icon: Code },
    { id: 'community', label: 'Community Voting', icon: Users },
    { id: 'goals', label: 'Stretch Goals', icon: Target },
    { id: 'support', label: 'Support Us', icon: Heart }
  ];

  const goals = [
    { title: 'Fund Level 1: The Awakening', progress: 50 },
    { title: 'Unlock New Character: The Mentor', progress: 70 },
    { title: 'Launch Real-Life Code Bootcamp', progress: 30 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent">
                HUSTLECODE
              </span>
              <span className="text-orange-500"> X</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8">
              From Struggle to Digital Empire
            </h2>
          </div>

          <div className="h-16 flex items-center justify-center mb-12">
            <p className="text-xl md:text-2xl text-cyan-400 font-light">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              Start Your Journey
              <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="border-2 border-orange-500 hover:bg-orange-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-gray-400">Hustlers Recovering</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">12</div>
              <div className="text-gray-400">Levels Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Concept Section */}
        {activeTab === 'concept' && (
          <section className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  The Concept
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  HustleCode X is a reality-recovery experience that merges storytelling, 
                  gamified learning and community co-creation. Players—dubbed "Hustlers"—embark 
                  on quests that mirror real-world challenges, learning to channel the energy 
                  of addiction into creative coding and entrepreneurship.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Through engaging missions and narrative arcs grounded in recovery psychology, 
                  you'll witness characters transform setbacks into milestones. Our goal is to 
                  inspire and empower individuals by showing that the same determination once 
                  applied to harmful habits can be redirected toward building digital skills, 
                  businesses and healthier communities.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                    <Zap className="text-yellow-400" size={16} />
                    <span className="text-sm">Gamified Learning</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                    <Code className="text-green-400" size={16} />
                    <span className="text-sm">Real Coding Skills</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                    <Heart className="text-red-400" size={16} />
                    <span className="text-sm">Recovery Support</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-gray-700 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Code size={64} className="text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Gameplay</h3>
                    <p className="text-gray-400">Experience recovery through code</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Community Section */}
        {activeTab === 'community' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Community Voting
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Your voice matters. As part of our collective, you help decide which characters, 
                levels, factions and features we develop next. Each vote is a step toward a more 
                inclusive Omniverse.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Users className="text-purple-400 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Democratic Development</h3>
                <p className="text-gray-300 mb-4">
                  We employ natural-language processing to summarize community feedback 
                  and highlight emerging themes, so your suggestions directly influence 
                  our development roadmap.
                </p>
                <button className="text-purple-400 hover:text-purple-300 font-semibold">
                  Join Discussion →
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Star className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Weekly Polls</h3>
                <p className="text-gray-300 mb-4">
                  Participate in weekly polls and open discussions to guide our journey. 
                  From newcomers to seasoned coders—everyone feels represented and heard.
                </p>
                <button className="text-yellow-400 hover:text-yellow-300 font-semibold">
                  Vote Now →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Goals Section */}
        {activeTab === 'goals' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Stretch Goals
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Together we dream big. Stretch goals unlock new realms, advanced gameplay 
                mechanics, and real-life mentorship programs for individuals recovering from addiction.
              </p>
            </div>

            <div className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{goal.title}</h3>
                    <span className="text-cyan-400 font-bold">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-center">Transparency Promise</h3>
              <p className="text-gray-300 text-center max-w-3xl mx-auto">
                Progress bars and real-time updates show exactly how close we are to each goal 
                and how your contributions make a difference. When we hit a target, the community 
                votes on how the funds are allocated.
              </p>
            </div>
          </section>
        )}

        {/* Support Section */}
        {activeTab === 'support' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Support the Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                By backing HustleCode X, you're investing in a community that empowers 
                recovery through creativity. Every contribution fuels development and 
                enables us to build a game that not only entertains but also uplifts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">$25</div>
                <h3 className="text-lg font-semibold mb-3">Supporter</h3>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Early beta access</li>
                  <li>Community updates</li>
                  <li>Digital wallpapers</li>
                </ul>
                <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition-colors">
                  Support Now
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border-2 border-orange-500 text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
                <div className="text-3xl font-bold text-orange-400 mb-2">$100</div>
                <h3 className="text-lg font-semibold mb-3">Hustler</h3>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>All Supporter benefits</li>
                  <li>Character naming rights</li>
                  <li>Behind-the-scenes content</li>
                  <li>Discord access</li>
                </ul>
                <button className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-lg font-semibold transition-colors">
                  Become a Hustler
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">$500</div>
                <h3 className="text-lg font-semibold mb-3">Mentor</h3>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>All Hustler benefits</li>
                  <li>1-on-1 mentorship call</li>
                  <li>Feature voting rights</li>
                  <li>Custom character design</li>
                </ul>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-colors">
                  Mentor Others
                </button>
              </div>
            </div>

            <div className="text-center">
              <a
                href="https://donorbox.org/hustlecodex"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 animate-pulse"
              >
                Donate & Empower
              </a>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent">
                HUSTLECODE X
              </span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transforming lives through the power of code, community, and recovery. 
              Every line of code is a step toward a better future.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
          
          <p className="text-gray-500 text-sm">
            © 2024 HustleCode X. All rights reserved. Made with ❤️ for the recovery community.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HustleCodeLanding;