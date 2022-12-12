<template>
    <v-card
        class="mx-auto"
        height="100%" 
        outlined
    >
        <v-list shaped>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        SEFAZ-MA
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Agenda SEFAZ
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

      <v-divider class="mb-5"></v-divider>
            <v-list-item-group
                v-model="selectedItem"
                color="primary"
            >
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="item.url"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: 'Home', icon: 'mdi-home', url: '/' },
      { text: 'Admin', icon: 'mdi-flag', url: '/admin' },
    ],
  }),
}
</script>