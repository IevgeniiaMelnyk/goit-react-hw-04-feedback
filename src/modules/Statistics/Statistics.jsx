import { useState } from 'react';
import Section from 'shared/components/Section/Section';
import FeedbackVariants from 'modules/StatisticsButtons/StatisticsButtons';
import StatisticsCount from 'modules/StatisticsCount/StatisticsCount';
import Notification from 'shared/components/Notification/Notification';

const Statistics = () => {
  const [reviews, setReviews] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const liveFeedback = name => {
    setReviews(prevState => {
      const value = prevState[name];
      return { ...prevState, [name]: value + 1 };
    });
  };

  const total = reviews.good + reviews.neutral + reviews.bad;

  const calcPercent = propName => {
    if (!total) {
      return 0;
    }
    const value = reviews[propName];
    const result = ((value / total) * 100).toFixed(0);
    return Number(result);
  };

  const statisticsOptions = Object.keys(reviews);
  const percent = calcPercent('good');

  return (
    <>
      <Section secondTitle="Please leave feedback">
        <FeedbackVariants
          statisticsOptions={statisticsOptions}
          liveFeedback={liveFeedback}
        />
      </Section>
      <Section secondTitle="Statistics">
        {!total ? (
          <Notification message="There is no feedback..." />
        ) : (
          <StatisticsCount
            good={reviews.good}
            neutral={reviews.neutral}
            bad={reviews.bad}
            total={total}
            percent={percent}
          />
        )}
      </Section>
    </>
  );
};

export default Statistics;
