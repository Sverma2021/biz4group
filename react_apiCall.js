componentDidUpdate(prevProps: IAssetsProps) {
    if (prevProps.loading && !this.props.loading && Object.keys(this.props.assets).length>0) {
      const pollingTimeouts = this.props.assets.reduce((accum, val) => {
        if (!val.isUploadComplete) {
          accum[val.uuid] = window.setInterval(
            () => this.props.fetchAssetUploadStatus(val.uuid),
            5000,
          );
        }
        return accum;
      }, {});
      this.setState({ pollingTimeouts });
    } 
    else if (!this.props.loading && Object.keys(this.props.assets).length>0) {
      const { pollingTimeouts } = this.state;
      let didUpdate = false;
      this.props.assets.forEach(asset => {
        if (asset.isUploadComplete && pollingTimeouts[asset.uuid]) {
          window.clearInterval(pollingTimeouts[asset.uuid]);
          delete pollingTimeouts[asset.uuid];
          didUpdate = true;
        }
      });
      if (didUpdate) {
        this.setState({ pollingTimeouts });
      }
    }
    if (prevProps.deleting && !this.props.deleting) {
      this.handleCloseDeleteModal();
    }
  }