import * as React from 'react';

export class ORYEditorPreview extends React.Component {
  render() {
    /*
    entry: Immutable collection containing the entry data.
    widgetFor: Returns the appropriate widget preview component for a given field.
    widgetsFor: Returns an array of objects with widgets and associated field data. For use with list and object type entries.
    getAsset: Returns the correct filePath or in-memory preview for uploaded images.
    fieldsMetaData: Contains aditional information (besides the plain plain textual value of each field) that can be useful for preview purposes.
    */
    const { entry, fieldsMetaData } = this.props;

    console.log(entry.toJS(), fieldsMetaData.toJS());

    /*
    Include template system from react-static or do some context magic
    */

    return (
      <div
        style={{
          background: 'red'
        }}
      >
        {entry.getIn(['data', 'title'])}
      </div>
    );
  }
}
