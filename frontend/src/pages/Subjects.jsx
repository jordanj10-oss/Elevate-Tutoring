import { useState } from 'react';
import { subjects, categories, levels } from '../data/subjects';
import './Subjects.css';

export default function Subjects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = subjects.filter(subject => {
    const matchCategory = selectedCategory === 'All' || subject.category === selectedCategory;
    const matchLevel = selectedLevel === 'All' || subject.levels.includes(selectedLevel);
    const matchSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        subject.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchLevel && matchSearch;
  });

  return (
    <div className="subjects-page">
      {/* Hero */}
      <section className="subjects-hero">
        <div className="container">
          <h1>All <span className="text-accent">Subjects</span></h1>
          <p>Browse our comprehensive list of subjects. From elementary basics to advanced college courses, we have an expert tutor for every topic.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="container">
          <div className="filters">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Grade Level</label>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value="All">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="results-count">{filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''} found</p>
        </div>
      </section>

      {/* Subjects List */}
      <section className="section">
        <div className="container">
          {filteredSubjects.length > 0 ? (
            <div className="subjects-list">
              {filteredSubjects.map(subject => (
                <div key={subject.id} className="subject-card">
                  <div className="subject-card-header">
                    <span className="subject-card-icon">{subject.icon}</span>
                    <div>
                      <h3>{subject.name}</h3>
                      <span className="subject-category-tag">{subject.category}</span>
                    </div>
                  </div>
                  <p className="subject-card-desc">{subject.description}</p>
                  <div className="subject-card-levels">
                    {subject.levels.map(level => (
                      <span key={level} className="level-tag">{level}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No subjects found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>Don't See What You're Looking For?</h2>
          <p>We're always expanding our subject offerings. Contact us and we'll find a tutor for your specific needs.</p>
          <a href="/contact" className="btn btn-primary btn-lg">Contact Us</a>
        </div>
      </section>
    </div>
  );
}