import * as React from 'react';

interface IProps {
  result: any;
}

class Result extends React.Component<IProps, any>
{
  constructor(props, context)
  {
    super(props, context);
  }

  public render()
  {
    const result = this.props.result;

    if (!result)
    {
      return null;
    }

    return (
      <li>
        {result.codeResult.code} [{result.codeResult.format}]
      </li>
    );
  }
}

export default Result;
