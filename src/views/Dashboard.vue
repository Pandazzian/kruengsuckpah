<template>
  <div>
    <CRow>
        <CCol col="12">
          <CCard>
            <CButton color="success" @click="showModal()" class="mr-1">
                        PAY NOW!
            </CButton>
            <CModal
              title="Modal title"
              color="success"
              :show.sync="successModal"
            >
              <h5>Scan to pay</h5>
              <div v-html="QR_svg"></div>
            </CModal>
          </CCard>
        </CCol>
    </CRow>
  </div>
</template>

<script>
import MainChartExample from './charts/MainChartExample'
import WidgetsDropdown from './widgets/WidgetsDropdown'
import WidgetsBrand from './widgets/WidgetsBrand'

export default {
  name: 'Modals',
  data () {
    return {
      successModal: false,
      QR_svg: null,
    }
  },
  methods: {
    showModal(){
      this.successModal = true
      this.generateQR()
    },
    generateQR(){
      const generatePayload = require('promptpay-qr')
      const qrcode = require('qrcode')
      const fs = require('fs')

      const mobileNumber = '000-000-0000'
      const IDCardNumber = '0-0000-00000-00-0'
      const amount = 0
      const payload = generatePayload(mobileNumber, { amount }) //First parameter : mobileNumber || IDCardNumber
      console.log(payload)

      // Convert to SVG QR Code
      const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
      qrcode.toString(payload, options, (err, svg) => {
          if (err) return console.log(err)
          this.QR_svg = svg
          // fs.writeFileSync('./qr.svg', svg)
          console.log(svg)
      })
    },

    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}
</script>
<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>