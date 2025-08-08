<template>
  <v-container>
    <v-form>
      <v-row class="mb-3 mt-3" align="center" justify="center">
        <v-col cols="4">
          <v-text-field
            class="ml-6 mr-6"
            v-model="ID"
            label="IDを入力"
            placeholder="IDを入力…"
            outlined
            @blur="$emit('id-check', ID)"
            type="number"
            :rules="[rules.required, rules.number]"
          ></v-text-field>
        </v-col>
        <p :style="{ color: isIdDuplicate ? 'red' : 'green', marginLeft: '24px' }">{{ idCheckMessage }}</p>
        <v-col cols="6">
          <v-text-field
            class="ml-6 mr-6"
            v-model="Name"
            label="Nameを入力"
            placeholder="Nameを入力…"
            outlined
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3 mt-3" align="center" justify="center">
        <v-col cols="4">
          <v-text-field
            class="ml-6 mr-6"
            v-model="Password"
            label="パスワードを入力 (最大10桁)"
            placeholder="パスワードを入力…"
            outlined
            type="password"
            :rules="[rules.required, rules.passwordMax]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            class="ml-6 mr-6"
            v-model="Email"
            label="Emailを入力"
            placeholder="Emailを入力…"
            outlined
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3 mt-3" align="center" justify="center">
        <v-col cols="4">
          <v-text-field
            class="ml-6 mr-6"
            v-model="Phone"
            label="Phoneを入力"
            placeholder="Phoneを入力…"
            outlined
            :rules="[rules.required, rules.phone]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            class="ml-6 mr-6"
            v-model="Address"
            label="Addressを入力"
            placeholder="Addressを入力…"
            outlined
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3 mt-3" align="center" justify="center">
        <v-col cols="4">
          <v-text-field
            class="ml-6 mr-6"
            v-model="Birth"
            label="Birthを入力 (YYYY-MM-DD HH:MM:SS)"
            placeholder="例: 2000-01-01 12:30:00"
            outlined
            :rules="[rules.required, rules.birthDate]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            class="ml-6 mr-6"
            v-model="selectedGroupId"
            :items="groupOptions"
            item-text="label"
            item-value="value"
            label="所属を選択"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="mb-3 mt-3" justify="center">
        <v-btn v-on:click="submitForm" dark large color="indigo">
          DBに登録
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'UserRegisterForm',
  props: {
    isIdDuplicate: {
      type: Boolean,
      required: true,
    },
    idCheckMessage: {
      type: String,
      required: true,
    },
    groupOptions: {
      type: Array,
      required: true,
    },
    insertResultMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ID: '',
      Password: '', 
      Name: '',
      Email: '',
      Phone: '',
      Address: '',
      Birth: '',
      selectedGroupId: -1,
      
      rules: {
        required: value => !!value || '必須項目です。',
        number: value => /^\d+$/.test(value) || '数値で入力してください。',
        passwordMax: value => (value && value.length <= 10) || 'パスワードは10桁以下で入力してください。',
        email: value => /.+@.+\..+/.test(value) || '有効なEメールアドレスを入力してください。',
        phone: value => /^[\d-]+$/.test(value) || '電話番号は数字とハイフンのみ使用できます。',
        birthDate: value => /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(value) || 'YYYY-MM-DD または YYYY-MM-DD HH:MM:SS 形式で入力してください。',
      },
    };
  },
  computed: {
    
  },
  methods: {
    submitForm() {
      
        const userData = {
          ID: this.ID,
          Password: this.Password,
          Name: this.Name,
          Email: this.Email,
          Phone: this.Phone,
          Address: this.Address,
          Birth: this.Birth,
          Group: this.selectedGroupId,
        };
        this.$emit('submit', userData);
      
    },
    clearForm() {
      this.ID = '';
      this.Password = '';
      this.Name = '';
      this.Email = '';
      this.Phone = '';
      this.Address = '';
      this.Birth = '';
      this.selectedGroupId = -1;
    }
  },
};
</script>