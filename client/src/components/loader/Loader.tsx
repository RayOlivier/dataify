import './Loader.scss';

export const Loader = () => (
  <div className="loader">
    <div className="bars">
      <div className="bar" style={{ animationDelay: '250ms' }} />
      <div className="bar  " style={{ animationDelay: '715ms' }} />
      <div className="bar " style={{ animationDelay: '475ms' }} />
      <div className="bar " style={{ animationDelay: '25ms' }} />
      <div className="bar " style={{ animationDelay: '190ms' }} />
    </div>
    Loading...
  </div>
);
