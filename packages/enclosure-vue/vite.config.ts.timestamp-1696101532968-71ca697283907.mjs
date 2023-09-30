// vite.config.ts
import { defineConfig } from "file:///mnt/d/home/workspaces/passerelle-vue/node_modules/vite/dist/node/index.js";
import vue from "file:///mnt/d/home/workspaces/passerelle-vue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///mnt/d/home/workspaces/passerelle-vue/node_modules/vite-plugin-dts/dist/index.mjs";

// package.json
var package_default = {
  name: "@passerelle/enclosure-vue",
  version: "0.0.1",
  description: "passerelle enclosure module for vue2 or vue3",
  author: "mew-ton <mxl_usmarc@slmail.mewton.jp>",
  license: "MIT",
  repository: {
    type: "git",
    url: "git@github.com:hacomono-lib/passerelle.git",
    directory: "packages/enclosure-vue"
  },
  type: "module",
  exports: {
    ".": {
      types: "./dist/types.d.ts",
      import: "./dist/index.js",
      require: "./dist/index.cjs"
    },
    "./*": "./*"
  },
  main: "./dist/index.cjs",
  module: "./dist/index.js",
  types: "./dist/types.d.ts",
  files: [
    "src",
    "dist"
  ],
  scripts: {
    dev: "vite build --watch",
    build: "vite build",
    typecheck: "vue-tsc --noEmit -p tsconfig.json --composite false",
    clean: "rm -rf dist"
  },
  dependencies: {
    "@intlify/vue-router-bridge": "^1.0.1",
    "@passerelle/enclosure": "^1.0.0",
    "type-assurer": "^0.1.1",
    "vue-demi": "^0.13.11"
  },
  devDependencies: {
    "@types/node": "^18",
    "@vitejs/plugin-vue": "^4.2.3",
    "@vue/composition-api": "^1.7.2",
    "@vue/tsconfig": "^0.4.0",
    typescript: "^5.1.6",
    vite: "^4.3.9",
    "vite-plugin-dts": "^3.2.0",
    vitest: "^0.32.2",
    "vue-tsc": "^1.6.5"
  },
  peerDependencies: {
    "@vue/composition-api": "^1.0.0",
    vue: "^2.6.0 || >=3.0.0",
    "vue-router": "^4.0.0 || ^3.0.0"
  },
  peerDependenciesMeta: {
    "@vue/composition-api": {
      optional: true
    },
    "vue-router": {
      optional: true
    }
  },
  publishConfig: {
    access: "public"
  }
};

// vite.config.ts
var devMode = process.env["NODE_ENV"] === "development";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true
    })
  ],
  build: {
    emptyOutDir: true,
    minify: false,
    cssCodeSplit: false,
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      name: "PasserelleEnclosureVue",
      formats: ["es", "cjs"],
      fileName: "index"
    },
    rollupOptions: {
      external: [...Object.keys(package_default.dependencies), ...Object.keys(package_default.peerDependencies)]
    }
  },
  esbuild: {
    pure: devMode ? [] : ["console.log", "console.info", "console.debug"]
  },
  optimizeDeps: {
    exclude: ["vue-demi", "@intlify/vue-router-bridge"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL21udC9kL2hvbWUvd29ya3NwYWNlcy9wYXNzZXJlbGxlLXZ1ZS9wYWNrYWdlcy9lbmNsb3N1cmUtdnVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2QvaG9tZS93b3Jrc3BhY2VzL3Bhc3NlcmVsbGUtdnVlL3BhY2thZ2VzL2VuY2xvc3VyZS12dWUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9kL2hvbWUvd29ya3NwYWNlcy9wYXNzZXJlbGxlLXZ1ZS9wYWNrYWdlcy9lbmNsb3N1cmUtdnVlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgcGFja2FnZXMgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmNvbnN0IGRldk1vZGUgPSBwcm9jZXNzLmVudlsnTk9ERV9FTlYnXSA9PT0gJ2RldmVsb3BtZW50J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgZHRzKHtcbiAgICAgIHJvbGx1cFR5cGVzOiB0cnVlXG4gICAgfSlcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6ICdzcmMvaW5kZXgudHMnLFxuICAgICAgbmFtZTogJ1Bhc3NlcmVsbGVFbmNsb3N1cmVWdWUnLFxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWy4uLk9iamVjdC5rZXlzKHBhY2thZ2VzLmRlcGVuZGVuY2llcyksIC4uLk9iamVjdC5rZXlzKHBhY2thZ2VzLnBlZXJEZXBlbmRlbmNpZXMpXVxuICAgIH1cbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIHB1cmU6IGRldk1vZGUgPyBbXSA6IFsnY29uc29sZS5sb2cnLCAnY29uc29sZS5pbmZvJywgJ2NvbnNvbGUuZGVidWcnXVxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ3Z1ZS1kZW1pJywgJ0BpbnRsaWZ5L3Z1ZS1yb3V0ZXItYnJpZGdlJ11cbiAgfVxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcIkBwYXNzZXJlbGxlL2VuY2xvc3VyZS12dWVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcInBhc3NlcmVsbGUgZW5jbG9zdXJlIG1vZHVsZSBmb3IgdnVlMiBvciB2dWUzXCIsXG4gIFwiYXV0aG9yXCI6IFwibWV3LXRvbiA8bXhsX3VzbWFyY0BzbG1haWwubWV3dG9uLmpwPlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOmhhY29tb25vLWxpYi9wYXNzZXJlbGxlLmdpdFwiLFxuICAgIFwiZGlyZWN0b3J5XCI6IFwicGFja2FnZXMvZW5jbG9zdXJlLXZ1ZVwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3R5cGVzLmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2luZGV4LmpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvaW5kZXguY2pzXCJcbiAgICB9LFxuICAgIFwiLi8qXCI6IFwiLi8qXCJcbiAgfSxcbiAgXCJtYWluXCI6IFwiLi9kaXN0L2luZGV4LmNqc1wiLFxuICBcIm1vZHVsZVwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICBcInR5cGVzXCI6IFwiLi9kaXN0L3R5cGVzLmQudHNcIixcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJzcmNcIixcbiAgICBcImRpc3RcIlxuICBdLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZSBidWlsZCAtLXdhdGNoXCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcInR5cGVjaGVja1wiOiBcInZ1ZS10c2MgLS1ub0VtaXQgLXAgdHNjb25maWcuanNvbiAtLWNvbXBvc2l0ZSBmYWxzZVwiLFxuICAgIFwiY2xlYW5cIjogXCJybSAtcmYgZGlzdFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBpbnRsaWZ5L3Z1ZS1yb3V0ZXItYnJpZGdlXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJAcGFzc2VyZWxsZS9lbmNsb3N1cmVcIjogXCJeMS4wLjBcIixcbiAgICBcInR5cGUtYXNzdXJlclwiOiBcIl4wLjEuMVwiLFxuICAgIFwidnVlLWRlbWlcIjogXCJeMC4xMy4xMVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4yLjNcIixcbiAgICBcIkB2dWUvY29tcG9zaXRpb24tYXBpXCI6IFwiXjEuNy4yXCIsXG4gICAgXCJAdnVlL3RzY29uZmlnXCI6IFwiXjAuNC4wXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMS42XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuMy45XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeMy4yLjBcIixcbiAgICBcInZpdGVzdFwiOiBcIl4wLjMyLjJcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS42LjVcIlxuICB9LFxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHZ1ZS9jb21wb3NpdGlvbi1hcGlcIjogXCJeMS4wLjBcIixcbiAgICBcInZ1ZVwiOiBcIl4yLjYuMCB8fCA+PTMuMC4wXCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMC4wIHx8IF4zLjAuMFwiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc01ldGFcIjoge1xuICAgIFwiQHZ1ZS9jb21wb3NpdGlvbi1hcGlcIjoge1xuICAgICAgXCJvcHRpb25hbFwiOiB0cnVlXG4gICAgfSxcbiAgICBcInZ1ZS1yb3V0ZXJcIjoge1xuICAgICAgXCJvcHRpb25hbFwiOiB0cnVlXG4gICAgfVxuICB9LFxuICBcInB1Ymxpc2hDb25maWdcIjoge1xuICAgIFwiYWNjZXNzXCI6IFwicHVibGljXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVyxTQUFTLG9CQUFvQjtBQUNuWSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTOzs7QUNGaEI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxFQUNmLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxFQUNYLFlBQWM7QUFBQSxJQUNaLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxJQUNQLFdBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxLQUFLO0FBQUEsTUFDSCxPQUFTO0FBQUEsTUFDVCxRQUFVO0FBQUEsTUFDVixTQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLE9BQVM7QUFBQSxFQUNULE9BQVM7QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULFdBQWE7QUFBQSxJQUNiLE9BQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsOEJBQThCO0FBQUEsSUFDOUIseUJBQXlCO0FBQUEsSUFDekIsZ0JBQWdCO0FBQUEsSUFDaEIsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxJQUNmLHNCQUFzQjtBQUFBLElBQ3RCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxJQUNSLG1CQUFtQjtBQUFBLElBQ25CLFFBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxrQkFBb0I7QUFBQSxJQUNsQix3QkFBd0I7QUFBQSxJQUN4QixLQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLHNCQUF3QjtBQUFBLElBQ3RCLHdCQUF3QjtBQUFBLE1BQ3RCLFVBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixVQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWlCO0FBQUEsSUFDZixRQUFVO0FBQUEsRUFDWjtBQUNGOzs7QUQ3REEsSUFBTSxVQUFVLFFBQVEsSUFBSSxVQUFVLE1BQU07QUFFNUMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0YsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEdBQUcsT0FBTyxLQUFLLGdCQUFTLFlBQVksR0FBRyxHQUFHLE9BQU8sS0FBSyxnQkFBUyxnQkFBZ0IsQ0FBQztBQUFBLElBQzdGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsZ0JBQWdCLGVBQWU7QUFBQSxFQUN0RTtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFlBQVksNEJBQTRCO0FBQUEsRUFDcEQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
