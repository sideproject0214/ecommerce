import React from "react";

const MonthPagination = ({ current, prevMonth, nextMonth }) => {
  return (
    <div className="control-month">
      {current === 0 ? (
        <div className="month"></div>
      ) : (
        <div className="month" onClick={prevMonth}>
          <i className="fas fa-chevron-circle-left prev-month"></i>
          <span>{`${current}개월 전`}</span>
        </div>
      )}
      <div className="month" onClick={nextMonth}>
        <span>{`${current + 1}개월 전`}</span>
        <i className="fas fa-chevron-circle-right next-month"></i>
      </div>
    </div>
  );
};

export default MonthPagination;
