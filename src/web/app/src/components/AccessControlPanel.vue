<template>
  <div>
    <el-alert v-if="isAccessControlListApiError" :title="accessControlListApiErrorMsg" type="error" show-icon class="errorAlert" />
    <el-table
      :data="accessControlList"
      v-loading="isAccessControlListLoading"
      style="width: 100%" emptyText="No Access Control for this Presentation!">
      <el-table-column
        prop="userIdentifier"
        label="Email">
      </el-table-column>
      <el-table-column
        label="Access Level">
        <template slot-scope="scope">
          <el-select :value="scope.row.accessLevel" placeholder="Select the permission"
                     @change="updateAccessControl(scope.row, $event)">
            <el-option label="View" value=CAN_READ></el-option>
            <el-option label="Edit" value=CAN_WRITE></el-option>
          </el-select>&nbsp;
          <el-button
            type="danger"
            @click="deleteAccessControl(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <h4>Add New Access Control</h4>
    <el-alert v-if="isAccessControlFormApiError" :title="accessControlFormApiErrorMsg" type="error" show-icon class="errorAlert"/>
    <el-form ref="accessControlForm" label-position="left" label-width="120px" v-loading="isAccessControlFormLoading" :model="accessControlForm" :rules="accessControlFormRule">
      <el-form-item label="Email address" prop="userIdentifier">
        <el-input v-model="accessControlFormUserIdentifier" placeholder="Email of the user to share"></el-input>
      </el-form-item>
      <el-form-item label="Permissions" prop="accessLevel">
        <el-select v-model="accessControlFormAccessLevel" placeholder="Permission the user will have" style="width: 100%">
          <el-option label="View" value="CAN_READ"></el-option>
          <el-option label="Edit" value="CAN_WRITE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addAccessControl()">Add</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "AccessControlPanel",

    props: {
      presentationId: {
        type: String,
        required: true
      }
    },

    watch: {
      'presentationId': {
        immediate: true,
        handler: 'fetchAccessControlList'
      }
    },

    data() {
      return {
        accessControlFormRule: {
          userIdentifier: [
            { required: true, message: 'Please enter the email', trigger: 'blur' },
            { type: 'email', message: 'Please enter a valid email', trigger: ['blur'] },
            { validator: (rule, value, callback) => {
                if (this.accessControlList.some(ele => ele.userIdentifier === value)) {
                  callback(new Error('There is existent access control for the user'));
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          accessLevel: [
            { required: true, message: 'Please give an access level', trigger: 'blur' },
          ]
        }
      }
    },

    computed: {
      isAccessControlListLoading() {
        return this.$store.state.accessControl.accessControlListStatus.isLoading
      },

      isAccessControlListApiError() {
        return this.$store.state.accessControl.accessControlListStatus.isApiError
      },

      accessControlListApiErrorMsg() {
        return this.$store.state.accessControl.accessControlListStatus.apiErrorMsg
      },

      isAccessControlFormLoading() {
        return this.$store.state.accessControl.accessControlFormStatus.isLoading
      },

      isAccessControlFormApiError() {
        return this.$store.state.accessControl.accessControlFormStatus.isApiError
      },

      accessControlFormApiErrorMsg() {
        return this.$store.state.accessControl.accessControlFormStatus.apiErrorMsg
      },


      accessControlList() {
        return this.$store.state.accessControl.accessControlList
      },

      accessControlForm() {
        return {
          userIdentifier: this.accessControlFormUserIdentifier,
          accessLevel: this.accessControlFormAccessLevel,
        }
      },

      accessControlFormUserIdentifier: {
        get() {
          return this.$store.state.accessControl.accessControlForm.userIdentifier
        },
        set(value) {
          this.$store.commit('setAccessControlFormField', {
            field: 'userIdentifier',
            value
          })
        },
      },
      accessControlFormAccessLevel: {
        get() {
          return this.$store.state.accessControl.accessControlForm.accessLevel
        },
        set(value) {
          this.$store.commit('setAccessControlFormField', {
            field: 'accessLevel',
            value
          })
        },
      },
    },

    methods: {
      fetchAccessControlList() {
        this.$store.dispatch('fetchAccessControlList', this.presentationId)
      },

      updateAccessControl({id}, $event) {
        this.$store.dispatch('updateAccessControl',
          {
            presentationId: this.presentationId,
            id,
            accessLevel: $event
          }
        );
      },
      deleteAccessControl({id}) {
        this.$store.dispatch('deleteAccessControl',
          {
            presentationId: this.presentationId,
            id,
          }
        );
      },
      addAccessControl() {
        this.$refs['accessControlForm'].validate((valid) => {
          if (!valid) {
            return
          }
          this.$store.dispatch('addAccessControl', {presentationId: this.presentationId,})
            .then(() => {
              this.accessControlFormUserIdentifier = '';
              this.accessControlFormAccessLevel = '';
              this.$refs['accessControlForm'].resetFields();
            });
        });
      },
    }
  }
</script>

<style scoped>
.errorAlert {
  margin-bottom: 15px;
}
</style>