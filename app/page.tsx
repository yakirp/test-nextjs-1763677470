'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'explore', label: 'Explore', icon: '🔍' },
    { id: 'collections', label: 'Collections', icon: '📁' },
    { id: 'recent', label: 'Recent', icon: '🕒' },
  ];

  return (
    <div className="flex h-screen bg-[#0f0f23] text-[#ececf1] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#171729] border-r border-[#2d2d44] flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#2d2d44]">
          <h1 className="text-xl font-semibold text-white">Atlas</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                selectedItem === item.id
                  ? 'bg-[#252538] text-white'
                  : 'text-[#8e8ea0] hover:bg-[#252538] hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d2d44]">
          <div className="px-4 py-2 text-xs text-[#8e8ea0]">
            <div className="font-medium text-white mb-1">Settings</div>
            <div className="hover:text-white cursor-pointer transition-colors">Preferences</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#2d2d44] bg-[#171729] flex items-center px-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white capitalize">
              {sidebarItems.find(item => item.id === selectedItem)?.label || 'Overview'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm text-[#8e8ea0] hover:text-white transition-colors">
              Search
            </button>
            <button className="px-4 py-2 text-sm bg-[#10a37f] text-white rounded-lg hover:bg-[#0d8f6e] transition-colors">
              New
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to Atlas
              </h1>
              <p className="text-lg text-[#8e8ea0] leading-relaxed">
                Discover and explore with ease. Navigate through your collections,
                explore new content, and manage your workspace.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { title: 'Quick Start', description: 'Get started with your first project', icon: '🚀' },
                { title: 'Templates', description: 'Browse our collection of templates', icon: '📄' },
                { title: 'Resources', description: 'Access helpful resources and guides', icon: '📚' },
                { title: 'Community', description: 'Connect with other users', icon: '👥' },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-[#171729] border border-[#2d2d44] rounded-xl p-6 hover:border-[#3d3d54] transition-all duration-200 cursor-pointer group"
                >
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#10a37f] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#8e8ea0]">{card.description}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-[#171729] border border-[#2d2d44] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  'Created new collection',
                  'Updated project settings',
                  'Shared workspace',
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 text-sm text-[#8e8ea0] hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#10a37f]"></div>
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
