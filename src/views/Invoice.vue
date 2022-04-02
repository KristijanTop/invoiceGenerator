<template>
  <div class="invoiceView">
    <div class="pageHeading">
      <router-link to="/"
        ><font-awesome-icon icon="fa-solid fa-angle-left" class="backIcon" /> Go
        back</router-link
      >
      <div>
        <button class="delete-btn" @click="deleteInvoice()">
          <i class="bi bi-trash-fill"></i> Delete
        </button>
        <button class="primary-btn" @click="downloadPDF()">
          <font-awesome-icon icon="fa-solid fa-download" class="downloadIcon" />
          Download PDF
        </button>
      </div>
    </div>

    <div class="invoiceContainer">
      <div class="heading">
        <h2 class="companyNameUser">{{ store.currentUser.companyName }}</h2>
        <p>{{ store.currentUser.adress }}</p>
        <p>
          {{ store.currentUser.zip }} {{ store.currentUser.city }},
          {{ store.currentUser.state }}
        </p>
        <p>{{ store.currentUser.country }}</p>
      </div>

      <div class="invoiceContent">
        <div class="billTo">
          <h3>Bill to</h3>
          <p>{{ store.invoiceData.customerName }}</p>
          <p>{{ store.invoiceData.customerAdress }}</p>
          <p>
            {{ store.invoiceData.customerZip }}
            {{ store.invoiceData.customerCity }},
            {{ store.invoiceData.customerState }}
          </p>
          <p>{{ store.invoiceData.customerCountry }}</p>
        </div>

        <div class="invoiceInfo">
          <div>
            <h3>Invoice #</h3>
            <span>{{ store.invoiceData.invoiceNumber.toUpperCase() }}</span>
          </div>
          <div>
            <h3>Invoice date:</h3>
            <span>{{ store.invoiceData.invoiceDate }}</span>
          </div>
        </div>
      </div>

      <div class="invoiceItems">
        <table>
          <tr>
            <th>Item name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>

          <tr
            v-for="(item, index) in store.invoiceData.invoiceItemList"
            :key="index"
          >
            <td>{{ store.invoiceData.invoiceItemList[index].itemName }}</td>
            <td>{{ store.invoiceData.invoiceItemList[index].itemQty }}</td>
            <td>${{ store.invoiceData.invoiceItemList[index].itemPrice }}</td>
            <td>${{ store.invoiceData.invoiceItemList[index].total }}</td>
          </tr>
        </table>
      </div>

      <div class="total">
        <h3>Total:</h3>
        <p>${{ store.invoiceData.invoiceTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { db, doc, deleteDoc } from "@/firebase";
import jspdf from "jspdf";
import playRegularNormal from "@/playRegularNormal";
import playBold from "@/playBold";

export default {
  name: "Invoice",
  data() {
    return {
      store,
    };
  },

  created() {
    document.title = "Invoice #" + store.invoiceData.invoiceNumber.toUpperCase();
  },

  methods: {
    async deleteInvoice() {
      await deleteDoc(doc(db, "invoices", this.store.invoiceData.id));
      this.$router.push({ name: "Home" });
    },

    downloadPDF() {
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
      doc.text(store.invoiceData.customerName, 30, 85);
      doc.text(store.invoiceData.customerAdress, 30, 92.5);
      doc.text(
        store.invoiceData.customerZip +
          " " +
          store.invoiceData.customerCity +
          ", " +
          store.invoiceData.customerState,
        30,
        100
      );
      doc.setFont("Play-Bold", "bold");
      doc.setFontSize(14);
      doc.text("Invoice #", 110, 75);
      doc.text("Invoice date:", 110, 85);
      doc.setFont("Play-Regular", "normal");
      doc.setFontSize(12);
      doc.text(store.invoiceData.invoiceNumber.toUpperCase(), 180, 75, "right");
      doc.text(store.invoiceData.invoiceDate, 180, 85, "right");
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

      for (let i = 0; i < store.invoiceData.invoiceItemList.length; i++) {
        doc.text(
          store.invoiceData.invoiceItemList[i].itemName,
          itemNameX,
          (itemNameY += 10),
          "center"
        );
        doc.text(
          store.invoiceData.invoiceItemList[i].itemQty,
          itemQtyX,
          (itemQtyY += 10),
          "center"
        );
        doc.text(
          "$" + store.invoiceData.invoiceItemList[i].itemPrice,
          itemPriceX,
          (itemPriceY += 10),
          "center"
        );
        doc.text(
          "$" + store.invoiceData.invoiceItemList[i].total.toString(),
          totalX,
          (totalY += 10),
          "center"
        );
        lineY = lineY += 10;
      }

      doc.line(25, lineY, 185, lineY);
      doc.setFont("Play-Bold", "bold");
      doc.setFontSize(14);
      doc.text(
        "Total:  $" + store.invoiceData.invoiceTotal,
        180,
        lineY + 15,
        "right"
      );

      doc.save(
        "Invoice #" + store.invoiceData.invoiceNumber.toUpperCase() + ".pdf"
      );
    },
  },
};
</script>

<style lang="scss">
.invoiceView {
  width: 100%;
  min-height: 100vh;
  padding-top: 150px;
  padding-bottom: 40px;

  .pageHeading {
    width: 90%;
    max-width: 700px;
    margin: 0px auto 40px auto;
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: #2c3e50;
      font-size: 20px;
      font-weight: bold;
      margin: auto 0px;

      .backIcon {
        margin-right: 7px;
        transition: 0.2s ease;
      }
    }

    a:hover .backIcon {
      transform: scale(1.3) translateX(-2px);
    }

    .delete-btn {
      background: rgb(199, 77, 97);
      border: none;
      outline: none;
      color: #fff;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      font-family: "Play";
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: 0.2s ease;
      margin-right: 15px;
    }

    .delete-btn:hover {
      background: rgb(160, 62, 78);
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

  .invoiceContainer {
    width: 90%;
    max-width: 700px;
    margin: auto;
    background: rgb(243, 243, 243);
    padding: 40px;
    border-radius: 10px;

    p {
      line-height: 1.5;
    }

    .heading {
      margin-bottom: 60px;

      h2 {
        margin-bottom: 10px;
      }
    }

    .invoiceContent {
      display: flex;
      justify-content: space-between;
      padding: 0px 20px;

      .billTo {
        margin-right: 30px;
        h3 {
          margin-bottom: 10px;
        }
      }

      .invoiceInfo {
        div {
          display: flex;
          justify-content: space-between;

          h3 {
            margin-right: 50px;
          }

          span {
            margin: auto 0px;
            text-align: right;
            padding: 5px;
          }
        }
      }
    }

    .invoiceItems {
      margin-top: 60px;

      table {
        width: 100%;
        text-align: center;

        td,
        th {
          padding: 7px;
          width: 25%;
        }
      }
    }

    .total {
      display: flex;
      justify-content: flex-end;
      margin-top: 60px;
      border-top: 1px solid #2c3e50;
      padding-top: 40px;
      padding-right: 40px;

      h3 {
        margin-right: 10px;
      }

      p {
        font-weight: bold;
        font-size: 17px;
      }
    }
  }
}
</style>