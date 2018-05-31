import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog';
import View from './View';
import colors from '../constants/colors';
import TaskContentBody from './TaskContentBody';
import TaskHeader from './TaskHeader';
import NotFound from '../components/NotFound';

const StyledFirepad = styled.div`
  height: '100%';
  width: '100%';
  .CodeMirror {
    background-color: ${colors.white};
  }
  .firepad-with-toolbar .CodeMirror {
    bottom: 0px;
    @media(max-width: 386px) {
      top: 98px;
    }
    @media(min-width: 387px) and (max-width: 695px) {
      top: 72px;
    }
    @media(min-width: 696px) and (max-width: 800px) {
      top: 46px;
    }
    @media(min-width: 800px) and (max-width: 974px) {
      top: 72px;
    }
    @media(min-width: 975px) {
      top: 46px;
    }
  }
  .CodeMirror-vscrollbar {
    display: none !important;
  }
  .firepad-toolbar {
    border-bottom: 1px solid ${colors.grey};
    line-height: 15px;
    @media(max-width: 386px) {
      height: 98px;
    }
    @media(min-width: 387px) and (max-width: 695px) {
      height: 72px;
    }
    @media(min-width: 696px) and (max-width: 800px) {
      height: 46px;
    }
    @media(min-width: 800px) and (max-width: 975px) {
      height: 72px;
    }
    @media(min-width: 975px) {
      height: 46px;
    }
  }
  .firepad-btn {
    border: 0;
    color: ${colors.darkGrey};
    background-color: ${colors.white};
    &:hover {
    background-color: ${colors.darkGrey};
    }
  }
  .powered-by-firepad {
    display: none;
  }
`;

export default function Firepad({
  changingPhase,
  dialogIsOpen,
  error,
  handleClose,
  handleSubmit,
  handleTitleChange,
  loading,
  notFound,
  openDialog,
  readOnly,
  title,
}) {
  if (error) {
    return (<p>{error.message}</p>);
  }
  if (changingPhase) {
    return (<p>Currently moving this document to the next phase</p>);
  }
  if (notFound) {
    return (<NotFound />);
  }
  const displayStyle = loading ? { display: 'none' } : {};
  return (
    <Fragment>
      { loading && (<p>Loading...</p>) }
      <div style={displayStyle}>
        <Dialog
          dialogIsOpen={dialogIsOpen}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
        <View>
          <div className="sides" />
          <div className="content">
            <TaskContentBody>
              <TaskHeader>
                <h2>Add New Post</h2>
                { !readOnly &&
                <Button onClick={openDialog} className="buttons">Submit</Button>
                }
              </TaskHeader>
              { readOnly ?
            (<h4>{title}</h4>) :
            <input
              onChange={handleTitleChange}
              placeholder="Add New Title Here"
              style={{
                width: '100%', backgroundColor: colors.white, border: 'none', borderBottom: `1px solid ${colors.grey}`, fontStyle: 'italic',
              }}
              value={title}
            />
        }
              <StyledFirepad id="firepad-container" />
            </TaskContentBody>
          </div>
          <div className="sides" />
        </View>
      </div>
    </Fragment>
  );
}

Firepad.propTypes = {
  changingPhase: PropTypes.bool.isRequired,
  dialogIsOpen: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      message: PropTypes.string,
      code: PropTypes.string,
    }),
  ]),
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  title: PropTypes.string,
  readOnly: PropTypes.bool,
};

Firepad.defaultProps = {
  dialogIsOpen: false,
  error: false,
  readOnly: true,
  title: '',
};
