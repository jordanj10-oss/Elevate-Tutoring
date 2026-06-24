import { pricingPlans, testPrepCourses } from '../data/pricing';
import './Pricing.css';

export default function Pricing() {
  return (
    <div className="pricing-page">
      {/* Hero */}
      <section className="pricing-hero">
        <div className="container">
          <h1>Simple, <span className="text-accent">Transparent</span> Pricing</h1>
          <p>Choose the plan that works best for you. No hidden fees, no long-term contracts — just quality tutoring at fair prices.</p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Choose Your <span className="text-accent">Plan</span></h2>
          <p className="section-subtitle">
            Whether you need occasional help or regular support, we have an option that fits your needs and budget.
          </p>

          <div className="pricing-grid">
            {pricingPlans.map(plan => (
              <div key={plan.id} className={`pricing-card ${plan.highlighted ? 'pricing-card-highlighted' : ''}`}>
                {plan.highlighted && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-card-header">
                  <h3>{plan.name}</h3>
                  <p className="pricing-subtitle">{plan.subtitle}</p>
                  <div className="pricing-amount">
                    <span className="price">${plan.price}</span>
                    <span className="unit">/{plan.unit}</span>
                  </div>
                  {plan.sessions && <p className="pricing-sessions">{plan.sessions}</p>}
                  {plan.savings && <span className="savings-badge">{plan.savings}</span>}
                </div>
                <div className="pricing-card-body">
                  <p className="pricing-description">{plan.description}</p>
                  <ul className="pricing-features">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="pricing-feature">
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={plan.stripeUrl} target="_blank" rel="noopener noreferrer" className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'} btn-block`}>
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Compare <span className="text-accent">Packages</span></h2>
          <p className="section-subtitle">See how our subscription packages stack up. The more you learn, the more you save.</p>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Pay-As-You-Go</th>
                  <th className="highlighted-col">Growth Pack</th>
                  <th>Accelerator Pack</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sessions per month</td>
                  <td>Unlimited (per session)</td>
                  <td className="highlighted-col">8</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Price per session</td>
                  <td>$45</td>
                  <td className="highlighted-col">~$34</td>
                  <td>~$31</td>
                </tr>
                <tr>
                  <td>Monthly total</td>
                  <td>Varies</td>
                  <td className="highlighted-col">$275</td>
                  <td>$375</td>
                </tr>
                <tr>
                  <td>Same tutor each session</td>
                  <td>✓</td>
                  <td className="highlighted-col">✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Priority scheduling</td>
                  <td>—</td>
                  <td className="highlighted-col">✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Progress tracking</td>
                  <td>—</td>
                  <td className="highlighted-col">✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Monthly progress report</td>
                  <td>—</td>
                  <td className="highlighted-col">✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Dedicated coordinator</td>
                  <td>—</td>
                  <td className="highlighted-col">—</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Cancel anytime</td>
                  <td>✓</td>
                  <td className="highlighted-col">✓</td>
                  <td>✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Test Prep Courses */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Test Prep <span className="text-accent">Courses</span></h2>
          <p className="section-subtitle">
            Structured, intensive preparation for standardized tests. One-time fee includes all sessions and materials.
          </p>

          <div className="testprep-grid">
            {testPrepCourses.map(course => (
              <div key={course.id} className="testprep-card">
                <div className="testprep-card-header">
                  <h3>{course.name}</h3>
                  <div className="testprep-price">
                    <span className="price">${course.price}</span>
                    <span className="unit"> / {course.sessions}</span>
                  </div>
                </div>
                <p className="testprep-description">{course.description}</p>
                <ul className="testprep-features">
                  {course.features.map((feature, i) => (
                    <li key={i} className="pricing-feature">
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href={course.stripeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">Enroll Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Frequently Asked <span className="text-accent">Questions</span></h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I switch between plans?</h3>
              <p>Yes! You can upgrade or downgrade your subscription at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a minimum commitment?</h3>
              <p>No. All subscription plans are month-to-month. You can cancel anytime with no penalty or hidden fees.</p>
            </div>
            <div className="faq-item">
              <h3>What if I need to cancel a session?</h3>
              <p>We offer free cancellation up to 24 hours before your scheduled session. Late cancellations may count toward your monthly session limit.</p>
            </div>
            <div className="faq-item">
              <h3>Can I get a refund for unused sessions?</h3>
              <p>Unused sessions from subscription plans do not roll over to the next month. However, we offer a satisfaction guarantee on your first session.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer group discounts?</h3>
              <p>Yes! We offer discounted rates for siblings and small study groups. Contact us for a custom quote.</p>
            </div>
            <div className="faq-item">
              <h3>How do I pay?</h3>
              <p>We accept all major credit cards, debit cards, and PayPal. Subscription plans are billed automatically each month.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}