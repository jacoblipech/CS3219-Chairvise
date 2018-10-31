<template>
  <div>
    <h2>More Detailed User Guide</h2>
    <h3>User Guide for Importing Data:</h3>
    <p>
      Step 1. Upon logging in, click on the "Import Data" tab.<br/>
      Step 2. Upload or drag the csv file from your computer.<br/>
      Step 3. Choose the table types of the csv file uploaded (i.e. Author Record, Review Record, Submission Record).<br/>
        Also select if there is a header row in the uploaded csv file<br/>
      Step 4. For your selected table type, map the database fields to the imported data fields one by one.<br/>
      Step 5. Finally click upload to update the database accordingly.<br/>
      <br/>
      <b>Note: </b> You can select any number of columns to map into the database. Ideally you should map all the data fields as shown below.
      We do not support mapping of empty fields into our current database for now.
    </p>
    <h3>User Guide for Adding Presentation:</h3>
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
      <b>Note: </b>The default mode for users is basic mode. Advanced mode is for users to make SQL queries straight from the database. We will update a separate documentation on this in the later stage.
    </p>
    <h3>User Guide for Sharing Presentation:</h3>
    <p>
      Step 1. Click on share button.<br/>
      Step 2. Change access detail of the shared link.<br/>
      Step 3. Enter the email address and permission given to that person.<br/>
      <br/>
      <b>Note: </b> You can view who has access to the presentation as well. And the user you shared to must have an account to access it.
    </p>
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
