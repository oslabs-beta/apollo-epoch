import * as React from 'react';
import PropTypes from 'prop-types';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import TimeButtons from './TimeButtons';
// import { diff1, diff2, diff3, diff4, diffHtml, nullDiff } from '../dummyData/data';
import '../styles/diff.css';

// export interface DiffInfoProps {}

const DiffInfo = () => {
  const [unchanged, setUnchanged] = React.useState(false);
  const { activeQuery, prevQuery } = useSelector((state) => state.apollo);
  console.log('aQ and pQ cacheSS ->', activeQuery.cacheSnapshot, prevQuery.cacheSnapshot);

  // calc diff using jsondiffpatch
  const delta = diff(prevQuery.cacheSnapshot, activeQuery.cacheSnapshot);
  // string of html with comparisons
  const diffHtml = formatters.html.format(delta, prevQuery.cacheSnapshot);
  // conditionally render changes or not based on unchanged bool
  formatters.html.showUnchanged(unchanged);

  return (
    <div className="diff-info">
      <div className="unchanged-toggle-div">
        <button
          type="button"
          className="unchanged-toggle"
          style={{ color: unchanged ? 'green' : 'red' }}
          onClick={() => {
            setUnchanged(!unchanged);
          }}
        >
          Show Unchanged
        </button>
      </div>
      {ReactHtmlParser(diffHtml)}
      <TimeButtons />
    </div>
  );
};

export default DiffInfo;
