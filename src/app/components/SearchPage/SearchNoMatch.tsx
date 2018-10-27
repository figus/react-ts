import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const DesertImg = require('./../../../images/desert.svg');

const SearchNoMatch = (props: any) =>
{
  return (
    <>
      <div>
        <img src={DesertImg} />
      </div>
      <div>
        No results found.
      </div>
    </>
  );
};

export default SearchNoMatch;
