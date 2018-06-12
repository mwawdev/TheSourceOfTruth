import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { storage } from 'firebase';
import ImageUploaderButton from '../components/ImageUploaderButton';
import ImageUploaderModal from '../components/ImageUploaderModal';

export default class ImageUploader extends Component {
  static propTypes = {
    firepadInst: PropTypes.shape({
      firepadWrapper_: PropTypes.shape({
        removeChild: PropTypes.func.isRequired,
      }),
      makeImageDialog_: PropTypes.func.isRequired,
      insertEntity: PropTypes.func.isRequired,
    }),
  }

  static defaultProps = {
    firepadInst: null,
  }

  state = {
    replaced: false,
  }

  componentDidMount() {
    this.replaceToolbarWithPortal();
  }

  componentDidUpdate() {
    this.replaceToolbarWithPortal();
  }

  handleImage = (files) => {
    if (files.length) {
      this.setState({ uploading: true }, () => {
        console.log('1');
        const file = files[0];
        console.log('1.5');
        const name = file.name
          // remove [, ], *, ?, per Google's object name guidelines
          .replace(/#|\[|\]|\*|\?/g, '')
          // replace any groups of whitespace with _
          .replace(/\s+/g, '_');
        console.log('1.76');
        const imagesRef = storage().ref().child(`images/${Date.now()}_${name}`);
        console.log('1.9');
        imagesRef
          .put(file)
          .then((snapshot) => {
            console.log('2');
            return snapshot.ref.getDownloadURL()
          })
          .then((downloadURL) => {
            console.log('3');
            this.props.firepadInst.insertEntity('img', { src: downloadURL });
            // this.setState({ uploading: false }, this.closeModal);
            this.closeModal();
          });
      });

    }
  }

  replaceToolbarWithPortal() {
    if (!this.state.replaced) {
      const child = document.querySelector('span.firepad-tb-insert-image');
      if (child) {
        const parent = child.parentNode;
        this.uploadButtonElement = parent.parentNode;
        this.uploadButtonElement.removeChild(parent);
        this.setState({ replaced: true });
      }
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  launchImageUploadModal = () => {
    const { firepadInst } = this.props;
    if (firepadInst) {
      // eslint-disable-next-line no-underscore-dangle
      // this.props.firepadInst.makeImageDialog_();
      this.setState({ modalOpen: true });
    }
  }

  render() {
    return (
      <Fragment>
        <ImageUploaderButton
          uploadButtonElement={this.uploadButtonElement}
          launchImageUploadModal={this.launchImageUploadModal}
        />
        <ImageUploaderModal
          closeModal={this.closeModal}
          handleImage={this.handleImage}
          modalOpen={this.state.modalOpen}
          uploading={this.state.uploading}
        />
      </Fragment>
    );
  }
}
