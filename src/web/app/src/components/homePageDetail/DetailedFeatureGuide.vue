<template>
  <div>
    <ul>
      <li><h2>More Detailed User Guide</h2></li>
      <li id="import-guide"><h3>User Guide for Importing Data:</h3></li>
      <p>
        Step 1. Upon logging in, click on the "Import Data" tab.<br/>
        Step 2. Upload or drag the csv file from your computer.<br/>
        Step 3. Choose the table types of the csv file uploaded (i.e. Author Record, Review Record, Submission Record).<br/>
        Step 4. Select if there is a header row in the uploaded csv file.<br/>
        Step 5. For your selected table type, map the database fields to the imported data fields one by one.<br/>
        Step 6. Finally click upload to update the database accordingly.<br/>
        <br/>
        <b>Note: </b> You can select any number of columns to map into the database. Please map all the data fields you need.
      </p>
      <li id="add-guide"><h3>User Guide for Adding Presentation:</h3></li>
      <p>
        Step 1. Upon logging in, click on the "Analyze" tab.<br/>
        Step 2. Create a new presentation name (minimum 3 characters) with description (optional).<br/>
        Step 3. Select a list of pre-defined visualizations for submission, author or review.<br/>
        Step 4. Click "Add New Section" to view the selected visualization section.<br/>
        Step 5. For each pre-defined visualization, you can edit, delete, filter and preview.<br/>
        Step 6. In Edit Mode, users can:
        <br/>&emsp; a. Change the name and add description of the visualization
        <br/>&emsp; b. Edit the mode of visualization.
        <br/>&emsp; c. Add filter for the field and value to hide from the visualization.
        <br/>&emsp; d. Preview the changes before making the final change through the save button.<br/>
        Step 7. Delete - Remove the visualization section from the presentation.<br/>
        Step 8. There is no limit to the number of visualizations to added by the users.<br/>
        <br/>
        <b>Note: </b>The default mode for users is basic mode. Advanced mode is for users to make SQL-like queries straight from the database. We will update a separate documentation on this in the later stage.
      </p>
      <li id="share-guide"><h3>User Guide for Sharing Presentation:</h3></li>
      <p>
        Step 1. Click on share button.<br/>
        Step 2. Enter the email address of the user to share to.<br/>
        Step 3. Change the permission (view or edit) given to the user.<br/>
        <br/>
        <b>Note: </b>There is also an option to give Public Access Control (view or edit). And you can view who has access to the presentation as well.
      </p>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "DetailedFeatureGuide.vue",
    }
</script>

<style scoped>
  p {
    font-size: 120%;
    text-align: justify;
  }
</style>
