<template>
<div>
  <div class="d-header d-flex gap-4 align-items-center mb-4">
    <img
      v-bind:src="currency.logo"
      v-bind:alt="currency.name"
      width="48"
      height="48"
      class="rounded-circle"
    />
    <div class="d-title">
      <h2 class="display-6 fw-light mb-0">{{ info.symbol }}</h2>
      <h3 class="fw-normal text-muted fs-6 mb-0 lh-sm">{{ currency.name }} price</h3>
    </div>
    <div v-if="ticker.price" class="d-ticker">
      <div class="display-6 fw-light">{{ ticker.localePrice }} {{ info.quote }}</div>
      <div v-bind:class="'fw-normal fs-5 lh-sm text-end color-' + ticker.direction">
        <span v-if="ticker.direction === 'down'"><BIconArrowDownShort /></span>
        <span v-else><BIconArrowUpShort /></span>
        {{ ticker.change }} %
      </div>
    </div>
  </div>
  <div class="row gy-3">
    <!-- SideBar -->
    <div class="col-lg-3">
      <div class="border rounded">
        <div class="px-3 pt-3">
          <h3 class="fs-4 fw-normal">Trending assets</h3>
          <p>Individual cryptocurrency exchanges' most popular assets have risen in popularity over time.</p>
        </div>
        <div class="list-group list-group-flush">
          <list view="list-item" />
        </div>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="border rounded p-3">
        <h3 class="fs-4 fw-normal">{{ currency.name }} to {{ info.unit }} chart</h3>
        <div class="chart-root position-relative">
          <template v-if="info.symbol">
            <chart
              v-bind:tick="ticker.price"
              v-bind:symbol="info.symbol + '' + info.quote"
              v-bind:priceScale="info.priceScale"
              v-bind:priceUnit="info.quote"
              v-bind:key="info.symbol"
            />
          </template>
          <template v-else>
            <div class="placeholder-glow">
              <div
                class="rounded placeholder w-100 mb-4 bg-opacity-10 bg-secondary placeholder__tools"
              ></div>
            </div>
            <div class="placeholder-glow chart-aspect">
              <div
                class="placeholder bg-opacity-10 bg-secondary position-absolute top-0 w-100 h-100 rounded"
              ></div>
            </div>
          </template>
        </div>
      </div>
      <div>
        <div class="d-flex flex-column flex-xl-row gap-3">
          <div class="d-ticker-card border rounded pt-3 pb-2 ps-3 pe-4">
            <div class="d-ticker-card-header d-flex align-items-center gap-3">
              <img
                v-bind:src="currency.logo"
                v-bind:alt="currency.name"
                width="32"
                height="32"
                class="rounded-circle"
              />
              <div class="d-ticker-card-title">
                <h2 class="fs-6 fw-bold mb-0">{{ info.symbol }} {{ info.quote }}</h2>
                <h3 class="fs-6 fw-light mb-0">{{ info.name }} / {{ info.unit }}</h3>
              </div>
            </div>
            <div class="d-ticker-card-body mt-2 text-nowrap">
              <span class="d-ticker-card-price fs-4 fw-bold">{{ ticker.localePrice }}</span>
              <p v-bind:class="'fw-normal fs-5 lh-sm text-end color-' + ticker.direction">
                <span v-if="ticker.direction === 'down'"><BIconArrowDownShort /></span>
                <span v-else><BIconArrowUpShort /></span>
                  {{ ticker.change }}
                  %
              </p>
            </div>
          </div>
          <div class="d-ticker-card border rounded pt-3 pb-2 ps-3 pe-4 flex-fill">
            <div class="d-ticker-card-header">
              <div class="d-ticker-card-title">
                <h2
                  class="fs-6 fw-normal mb-0 text-nowrap"
                >{{ info.name }} low and high prices in selected time frame</h2>
              </div>
            </div>
            <div class="d-ticker-card-body mt-4">
              <div class="position-relative pb-4">
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    v-bind:style="'width: ' + progressWidth + '%'"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <small
                  class="position-absolute bottom-0 start-0"
                >{{ $filters.format(stats.low, info.priceScale) }}</small>
                <small
                  class="position-absolute bottom-0 end-0"
                >{{ $filters.format(stats.high, info.priceScale) }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { BIconArrowDownShort, BIconArrowUpShort } from 'bootstrap-icons-vue'
import List from './List'
import Chart from './Chart'
export default {
  name: 'Detail',
  components: {
    BIconArrowDownShort,
    BIconArrowUpShort,
    Chart,
    List
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  computed: {
    currency () {
      return this.$store.getters.getCurrencyBySlug(this.slug)
    },
    ticker () {
      return this.$store.getters.getTickerBySlug(this.slug)
    },
    info () {
      return this.$store.getters.getInfoBySlug(this.slug)
    },
    stats () {
      return this.$store.getters.getGraphStats()
    },
    progressWidth () {
      return this.ticker.price && this.stats.low && this.stats.high
        ? this.$arithmetic.fix(
          this.$arithmetic.times(
            this.$arithmetic.div(
              100,
              this.$arithmetic.minus(this.stats.high, this.stats.low)), this.$arithmetic.minus(this.ticker.price, this.stats.low)), 2) : 0
    }
  }
}
</script>

<style scoped>
.d-header {
  min-height: 74px;
}
.placeholder__tools {
  height: 34px;
}
</style>

<style>
.chart-aspect {
  height: 0;
  position: relative;
  padding-top: 56.25%;
}
</style>
