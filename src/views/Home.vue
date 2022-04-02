<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <div>
        <h1>My invoices</h1>
        <p>{{invoiceCount}}</p>
        </div>
        <button class="primary-btn" @click="openForm()">New Invoice</button>
      </div>

      <div class="invoice" v-for="(invoice, index) in invoices" :key="index">
        <div class="number">
          <span>#{{ invoices[index].invoiceNumber }}</span>
        </div>
        <div class="date">
          <span>{{ invoices[index].invoiceDate }}</span>
        </div>
        <div class="name">
          <span>{{ invoices[index].customerName }}</span>
        </div>
        <div class="total">
          <span>${{ invoices[index].invoiceTotal }}</span>
        </div>
        <div class="footerInvoice">
          <div class="download">
            <button class="primary-btn" @click="downloadPDF(invoices[index])">
              <font-awesome-icon
                icon="fa-solid fa-download"
                class="downloadIcon"
              />
              Download PDF
            </button>
          </div>
          <div class="more">
            <router-link
              :to="{
                name: 'Invoice',
                params: { invoiceId: invoices[index].invoiceNumber },
              }"
            >
              <span @click="passInvoiceData(invoices[index])"
                ><font-awesome-icon
                  icon="fa-solid fa-angle-right"
                  class="moreIcon"
              /></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <transition name="invoiceModal">
      <div class="form" v-if="formVisible">
        <h2>Enter customer and invoice information</h2>
        <div class="content">
          <div>
            <p>Customer name</p>
            <input
              type="text"
              placeholder="Customer name"
              v-model="customerName"
            />
          </div>
          <div>
            <p>Customer adress</p>
            <input
              type="text"
              placeholder="Customer adress"
              v-model="customerAdress"
            />
          </div>
          <div>
            <p>City</p>
            <input type="text" placeholder="City" v-model="customerCity" />
          </div>
          <div>
            <p>Zip/postal code</p>
            <input
              type="text"
              placeholder="Zip/postal code"
              v-model="customerZip"
            />
          </div>
          <div>
            <p>Country</p>
            <select id="country" name="country" v-model="customerCountry">
              <option value="Afganistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antigua & Barbuda">Antigua & Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bonaire">Bonaire</option>
              <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="British Indian Ocean Ter">
                British Indian Ocean Ter
              </option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Canary Islands">Canary Islands</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Central African Republic">
                Central African Republic
              </option>
              <option value="Chad">Chad</option>
              <option value="Channel Islands">Channel Islands</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cocos Island">Cocos Island</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cote DIvoire">Cote DIvoire</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Curaco">Curacao</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="East Timor">East Timor</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Falkland Islands">Falkland Islands</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="French Southern Ter">French Southern Ter</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Great Britain">Great Britain</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="Indonesia">Indonesia</option>
              <option value="India">India</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea North">Korea North</option>
              <option value="Korea Sout">Korea South</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macau">Macau</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Malawi">Malawi</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value="Midway Islands">Midway Islands</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Nambia">Nambia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherland Antilles">Netherland Antilles</option>
              <option value="Netherlands">Netherlands (Holland, Europe)</option>
              <option value="Nevis">Nevis</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau Island">Palau Island</option>
              <option value="Palestine">Palestine</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Phillipines">Philippines</option>
              <option value="Pitcairn Island">Pitcairn Island</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Republic of Montenegro">
                Republic of Montenegro
              </option>
              <option value="Republic of Serbia">Republic of Serbia</option>
              <option value="Reunion">Reunion</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="St Barthelemy">St Barthelemy</option>
              <option value="St Eustatius">St Eustatius</option>
              <option value="St Helena">St Helena</option>
              <option value="St Kitts-Nevis">St Kitts-Nevis</option>
              <option value="St Lucia">St Lucia</option>
              <option value="St Maarten">St Maarten</option>
              <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
              <option value="St Vincent & Grenadines">
                St Vincent & Grenadines
              </option>
              <option value="Saipan">Saipan</option>
              <option value="Samoa">Samoa</option>
              <option value="Samoa American">Samoa American</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome & Principe">Sao Tome & Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Tahiti">Tahiti</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Togo">Togo</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad & Tobago">Trinidad & Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks & Caicos Is">Turks & Caicos Is</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Erimates">United Arab Emirates</option>
              <option value="United States of America">
                United States of America
              </option>
              <option value="Uraguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City State">Vatican City State</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Virgin Islands (Brit)">
                Virgin Islands (Brit)
              </option>
              <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
              <option value="Wake Island">Wake Island</option>
              <option value="Wallis & Futana Is">Wallis & Futana Is</option>
              <option value="Yemen">Yemen</option>
              <option value="Zaire">Zaire</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
          </div>
          <div>
            <p>State/Province</p>
            <input
              type="text"
              placeholder="State/Province"
              v-model="customerState"
            />
          </div>
          <div>
            <p>Invoice number</p>
            <input
              type="text"
              placeholder="Invoice number"
              v-model="invoiceNumber"
            />
          </div>
          <div>
            <p>Invoice date</p>
            <input type="date" v-model="invoiceDate" />
          </div>
        </div>
        <h3>Invoice total: ${{ calculateTotal }}</h3>
        <div
          class="invoice-items"
          v-for="(item, index) in invoiceItemList"
          :key="index"
        >
          <div class="invoice-name">
            <p>Item name</p>
            <input
              type="text"
              placeholder="Item name"
              v-model="item.itemName"
            />
          </div>
          <div class="invoice-qty">
            <p>Qty</p>
            <input type="number" placeholder="Qty" v-model="item.itemQty" />
          </div>
          <div class="invoice-price">
            <p>Price</p>
            <input type="number" placeholder="Price" v-model="item.itemPrice" />
          </div>
          <div>
            <p>Total</p>
            <p style="padding: 10px">
              ${{ (item.total = item.itemQty * item.itemPrice) }}
            </p>
          </div>
          <div class="remove-item">
            <p @click="removeItem(index)"><i class="bi bi-trash-fill"></i></p>
          </div>
        </div>
        <button class="newItem-btn" @click="addNewItem()">
          <i class="bi bi-plus-circle-fill"></i> Add new invoice item
        </button>
        <div class="footer">
          <button class="discard" @click="formVisible = false">Discard</button>
          <button class="primary-btn" @click="createInvoice()">Create</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  db,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "@/firebase";

import store from "@/store";
import jspdf from "jspdf";
import playRegularNormal from "@/playRegularNormal";
import playBold from "@/playBold";

export default {
  name: "Home",
  data() {
    return {
      store,
      formVisible: false,
      customerName: null,
      invoiceNumber: null,
      customerAdress: null,
      invoiceDate: null,
      customerCity: null,
      customerZip: null,
      customerCountry: "Croatia",
      customerState: null,
      invoiceItemList: [],
      invoices: [],
    };
  },

  created() {
    document.title = "InvoiceGenerator";
  },

  mounted() {
    this.getInvoices();
  },

  computed: {
    calculateTotal() {
      let total = 0;
      for (let i = 0; i < this.invoiceItemList.length; i++) {
        total +=
          this.invoiceItemList[i].itemPrice * this.invoiceItemList[i].itemQty;
      }
      return total;
    },

    invoiceCount() {
      var count;
      if (this.invoices.length === 1) {
        count = "You currently have 1 invoice"
      }
      else {
        count = "You currently have " + this.invoices.length + " invoices"
      }
      return count
    }
  },

  methods: {
    openForm() {
      this.formVisible = true;
    },
    addNewItem() {
      this.invoiceItemList.push({
        itemName: "",
        itemQty: 0,
        itemPrice: 0,
        total: 0,
      });
    },

    removeItem(index) {
      this.invoiceItemList.splice(index, 1);
    },

    passInvoiceData(data) {
      this.store.invoiceData = data;
    },

    downloadPDF(invoice) {
      const doc = new jspdf();
      doc.setFont("Play-Bold", "bold");
      doc.setFontSize(18);
      doc.text(store.currentUser.companyName, 20, 20);
      doc.setFont("Play-Regular", "normal");
      doc.setFontSize(12);
      doc.text(store.currentUser.adress, 20, 30);
      doc.text(
        store.currentUser.zip +
          " " +
          store.currentUser.city +
          ", " +
          store.currentUser.state,
        20,
        37.5
      );
      doc.text(store.currentUser.country, 20, 45);
      doc.setFont("Play-Bold", "bold");
      doc.setFontSize(14);
      doc.text("Bill to", 30, 75);
      doc.setFont("Play-Regular", "normal");
      doc.setFontSize(12);
      doc.text(invoice.customerName, 30, 85);
      doc.text(invoice.customerAdress, 30, 92.5);
      doc.text(
        invoice.customerZip +
          " " +
          invoice.customerCity +
          ", " +
          invoice.customerState,
        30,
        100
      );
      doc.setFont("Play-Bold", "bold");
      doc.setFontSize(14);
      doc.text("Invoice #", 110, 75);
      doc.text("Invoice date:", 110, 85);
      doc.setFont("Play-Regular", "normal");
      doc.setFontSize(12);
      doc.text(invoice.invoiceNumber.toUpperCase(), 180, 75, "right");
      doc.text(invoice.invoiceDate, 180, 85, "right");
      doc.setFont("Play-Bold", "bold");
      doc.text("Item name", 47.5, 130, "center");
      doc.text("Qty", 87.5, 130, "center");
      doc.text("Price", 127.5, 130, "center");
      doc.text("Total", 167.5, 130, "center");
      doc.setFont("Play-Regular", "normal");

      var itemNameX = 47.5;
      var itemNameY = 130;
      var itemQtyX = 87.5;
      var itemQtyY = 130;
      var itemPriceX = 127.5;
      var itemPriceY = 130;
      var totalX = 167.5;
      var totalY = 130;
      var lineY = 150;

      for (let i = 0; i < invoice.invoiceItemList.length; i++) {
        doc.text(invoice.invoiceItemList[i].itemName, itemNameX, itemNameY+=10, "center");
        doc.text(invoice.invoiceItemList[i].itemQty, itemQtyX, itemQtyY+=10, "center");
        doc.text('$' + invoice.invoiceItemList[i].itemPrice, itemPriceX, itemPriceY+=10, "center");
        doc.text('$' + invoice.invoiceItemList[i].total.toString(), totalX, totalY+=10, "center");
        lineY = lineY+=10
      };

      doc.line(25, lineY, 185, lineY);
      doc.setFont("Play-Bold", "bold");
      doc.setFontSize(14);
      doc.text('Total:  $' + invoice.invoiceTotal, 180, lineY+15, "right")

      doc.save("Invoice #" + invoice.invoiceNumber.toUpperCase() +  ".pdf");
    },

    async createInvoice() {
      if (
        this.invoiceItemList.length === 0 ||
        this.customerName == null ||
        this.invoiceNumber == null ||
        this.customerAdress == null ||
        this.invoiceDate == null ||
        this.customerCity == null ||
        this.customerZip == null ||
        this.customerState == null
      ) {
        alert("Please fill out all fields");
      } else {
        try {
          const docRef = await addDoc(collection(db, "invoices"), {
            authorId: store.currentUser.uid,
            customerName: this.customerName,
            customerAdress: this.customerAdress,
            customerCity: this.customerCity,
            customerZip: this.customerZip,
            customerCountry: this.customerCountry,
            customerState: this.customerState,
            invoiceNumber: this.invoiceNumber,
            invoiceDate: this.invoiceDate,
            invoiceItemList: this.invoiceItemList,
            invoiceTotal: this.calculateTotal,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        this.formVisible = false;
        this.customerName = null;
        this.customerAdress = null;
        this.customerCity = null;
        this.customerZip = null;
        this.customerCountry = "Croatia";
        this.customerState = null;
        this.invoiceNumber = null;
        this.invoiceDate = null;
        this.invoiceItemList = [];
        this.getInvoices();
      }
    },

    async getInvoices() {
      const q = query(
        collection(db, "invoices"),
        where("authorId", "==", store.currentUser.uid),
        orderBy("invoiceDate", "desc")
      );
      const querySnapshot = await getDocs(q);
      this.invoices = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.invoices.push({
          id: doc.id,
          customerName: data.customerName,
          customerAdress: data.customerAdress,
          customerCity: data.customerCity,
          customerZip: data.customerZip,
          customerCountry: data.customerCountry,
          customerState: data.customerState,
          invoiceNumber: data.invoiceNumber,
          invoiceDate: data.invoiceDate,
          invoiceItemList: data.invoiceItemList,
          invoiceTotal: data.invoiceTotal,
        });
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  min-height: 100vh;

  .container {
    margin: 0px auto;
    padding-top: 150px;
    padding-bottom: 20px;
    width: 90%;
    max-width: 900px;

    .header {
      display: flex;
      margin-bottom: 60px;
      justify-content: space-between;

      h1 {
        font-size: 28px;
        margin-bottom: 15px;
      }

      .primary-btn {
        max-height: 51px;
        margin: auto 0px;
      }
    }
    .invoice {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-align: center;
      background: rgb(243, 243, 243);
      padding: 40px;
      border-radius: 20px;
      margin: auto;
      margin-bottom: 20px;

      div {
        margin: auto 0px;

        span {
          padding: 10px 0px;
        }

        .primary-btn {
          border-radius: 5px;
          padding: 10px;
          font-size: 15px;

          .downloadIcon {
            margin-right: 2px;
          }
        }
      }

      .number {
        width: 5%;
        font-size: 18px;
        text-transform: uppercase;
      }

      .date {
        width: 20%;
      }

      .name {
        width: 20%;
      }

      .total {
        width: 20%;
        font-weight: bold;
        font-size: 18px;
      }

      .footerInvoice {
        display: flex;
        .download {
          margin-right: 35px;
        }

        a {
          text-decoration: none;
          color: #2c3e50;
        }

        .more {
          font-size: 20px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .more:hover {
          transform: scale(1.3) translateX(2px);
        }
      }
    }
  }

  .form {
    width: 90%;
    max-width: 500px;
    height: 100vh;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 40px;
    transition: all 0.5s ease-in;

    input,
    select {
      padding: 10px;
      border: none;
      background: rgb(243, 243, 243);
      border-radius: 5px;
      width: 100%;
      min-width: 180px;
      font-family: "Play";
    }

    h2 {
      margin-bottom: 25px;
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      div {
        flex: 1;

        p {
          font-size: 18px;
          margin-bottom: 5px;
        }
      }
    }

    h3 {
      margin-top: 25px;
    }

    .invoice-items {
      margin-top: 15px;
      display: flex;
      gap: 20px;

      div {
        margin-top: auto;

        input {
          width: 100%;
          min-width: 0px;
        }
      }

      .invoice-qty {
        width: 17%;
        min-width: 40px;
      }

      .invoice-price {
        width: 20%;
        min-width: 40px;
      }
    }

    .newItem-btn {
      background: rgb(243, 243, 243);
      padding: 7px;
      outline: none;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-family: "Play";
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: 0.2s ease;
      margin-top: 20px;
      margin-bottom: 40px;

      i {
        color: rgb(96, 52, 255);
        margin-right: 5px;
        font-size: 18px;
      }
    }

    .newItem-btn:hover {
      background: rgb(230, 230, 230);
    }

    .remove-item {
      padding: 10px 0px;
      font-size: 20px;

      p {
        cursor: pointer;
        transition: 0.2s ease;
      }

      p:hover {
        color: rgb(96, 52, 255);
      }
    }

    .footer {
      display: flex;
      justify-content: space-around;
      margin-top: auto;

      .primary-btn {
        width: 87px;
      }

      .discard {
        background: rgb(199, 77, 97);
        color: #fff;
        padding: 15px;
        outline: none;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-family: "Play";
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.5px;
        transition: 0.2s ease;
      }

      .discard:hover {
        background: rgb(160, 62, 78);
      }
    }
  }
}

.invoiceModal-leave-active {
  transition: all 0.5s ease-in;
}

.invoiceModal-enter,
.invoiceModal-leave-active {
  transform: translateX(-500px);
  transition: all 0.5s ease-in;
}

@media only screen and (max-width: 903px) {
  .invoice {
    display: block !important;
    width: 90% !important;
    max-width: 370px !important;

    .number,
    .date,
    .name,
    .total {
      width: 100% !important;

      span {
        display: block;
      }
    }

    .download {
      margin: auto !important;
    }

    .footerInvoice {
      margin-top: 40px !important;
    }
  }
}
</style>
