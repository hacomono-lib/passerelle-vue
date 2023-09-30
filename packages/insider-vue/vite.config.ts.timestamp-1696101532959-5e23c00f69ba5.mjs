// vite.config.ts
import { defineConfig } from "file:///mnt/d/home/workspaces/passerelle-vue/node_modules/vite/dist/node/index.js";
import vue from "file:///mnt/d/home/workspaces/passerelle-vue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///mnt/d/home/workspaces/passerelle-vue/node_modules/vite-plugin-dts/dist/index.mjs";

// package.json
var package_default = {
  name: "@passerelle/insider-vue",
  version: "0.0.1",
  description: "passerelle insider module for vue2 or vue3",
  repository: {
    type: "git",
    url: "git@github.com:hacomono-lib/passerelle.git",
    directory: "packages/insider-vue"
  },
  license: "MIT",
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
    typecheck: "tsc --noEmit -p tsconfig.json",
    clean: "rm -rf dist"
  },
  dependencies: {
    "@intlify/vue-router-bridge": "^1.0.1",
    "@passerelle/insider": "^1.0.0",
    "vue-demi": "^0.13.11"
  },
  devDependencies: {
    "@types/node": "^18",
    typescript: "^5.1.6",
    vite: "^4.3.9",
    vitest: "^0.32.2",
    "vue-tsc": "^1.8.4"
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
      rollupTypes: true,
      bundledPackages: ["vue-demi", "@intlify/vue-router-bridge"]
    })
  ],
  build: {
    emptyOutDir: true,
    minify: false,
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      name: "PasserelleInsiderVue",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL21udC9kL2hvbWUvd29ya3NwYWNlcy9wYXNzZXJlbGxlLXZ1ZS9wYWNrYWdlcy9pbnNpZGVyLXZ1ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9kL2hvbWUvd29ya3NwYWNlcy9wYXNzZXJlbGxlLXZ1ZS9wYWNrYWdlcy9pbnNpZGVyLXZ1ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2QvaG9tZS93b3Jrc3BhY2VzL3Bhc3NlcmVsbGUtdnVlL3BhY2thZ2VzL2luc2lkZXItdnVlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgcGFja2FnZXMgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmNvbnN0IGRldk1vZGUgPSBwcm9jZXNzLmVudlsnTk9ERV9FTlYnXSA9PT0gJ2RldmVsb3BtZW50J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgZHRzKHtcbiAgICAgIHJvbGx1cFR5cGVzOiB0cnVlLFxuICAgICAgYnVuZGxlZFBhY2thZ2VzOiBbJ3Z1ZS1kZW1pJywgJ0BpbnRsaWZ5L3Z1ZS1yb3V0ZXItYnJpZGdlJ11cbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcbiAgICAgIG5hbWU6ICdQYXNzZXJlbGxlSW5zaWRlclZ1ZScsXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxuICAgICAgZmlsZU5hbWU6ICdpbmRleCdcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMocGFja2FnZXMuZGVwZW5kZW5jaWVzKSwgLi4uT2JqZWN0LmtleXMocGFja2FnZXMucGVlckRlcGVuZGVuY2llcyldXG4gICAgfVxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAgcHVyZTogZGV2TW9kZSA/IFtdIDogWydjb25zb2xlLmxvZycsICdjb25zb2xlLmluZm8nLCAnY29uc29sZS5kZWJ1ZyddXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsndnVlLWRlbWknLCAnQGludGxpZnkvdnVlLXJvdXRlci1icmlkZ2UnXVxuICB9XG59KVxuIiwgIntcbiAgXCJuYW1lXCI6IFwiQHBhc3NlcmVsbGUvaW5zaWRlci12dWVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcInBhc3NlcmVsbGUgaW5zaWRlciBtb2R1bGUgZm9yIHZ1ZTIgb3IgdnVlM1wiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206aGFjb21vbm8tbGliL3Bhc3NlcmVsbGUuZ2l0XCIsXG4gICAgXCJkaXJlY3RvcnlcIjogXCJwYWNrYWdlcy9pbnNpZGVyLXZ1ZVwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC90eXBlcy5kLnRzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L2luZGV4LmNqc1wiXG4gICAgfSxcbiAgICBcIi4vKlwiOiBcIi4vKlwiXG4gIH0sXG4gIFwibWFpblwiOiBcIi4vZGlzdC9pbmRleC5janNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgXCJ0eXBlc1wiOiBcIi4vZGlzdC90eXBlcy5kLnRzXCIsXG4gIFwiZmlsZXNcIjogW1xuICAgIFwic3JjXCIsXG4gICAgXCJkaXN0XCJcbiAgXSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGUgYnVpbGQgLS13YXRjaFwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJ0eXBlY2hlY2tcIjogXCJ0c2MgLS1ub0VtaXQgLXAgdHNjb25maWcuanNvblwiLFxuICAgIFwiY2xlYW5cIjogXCJybSAtcmYgZGlzdFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBpbnRsaWZ5L3Z1ZS1yb3V0ZXItYnJpZGdlXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJAcGFzc2VyZWxsZS9pbnNpZGVyXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJ2dWUtZGVtaVwiOiBcIl4wLjEzLjExXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMThcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4xLjZcIixcbiAgICBcInZpdGVcIjogXCJeNC4zLjlcIixcbiAgICBcInZpdGVzdFwiOiBcIl4wLjMyLjJcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjRcIlxuICB9LFxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHZ1ZS9jb21wb3NpdGlvbi1hcGlcIjogXCJeMS4wLjBcIixcbiAgICBcInZ1ZVwiOiBcIl4yLjYuMCB8fCA+PTMuMC4wXCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMC4wIHx8IF4zLjAuMFwiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc01ldGFcIjoge1xuICAgIFwiQHZ1ZS9jb21wb3NpdGlvbi1hcGlcIjoge1xuICAgICAgXCJvcHRpb25hbFwiOiB0cnVlXG4gICAgfSxcbiAgICBcInZ1ZS1yb3V0ZXJcIjoge1xuICAgICAgXCJvcHRpb25hbFwiOiB0cnVlXG4gICAgfVxuICB9LFxuICBcInB1Ymxpc2hDb25maWdcIjoge1xuICAgIFwiYWNjZXNzXCI6IFwicHVibGljXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVyxTQUFTLG9CQUFvQjtBQUM3WCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTOzs7QUNGaEI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxFQUNmLFlBQWM7QUFBQSxJQUNaLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxJQUNQLFdBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxLQUFLO0FBQUEsTUFDSCxPQUFTO0FBQUEsTUFDVCxRQUFVO0FBQUEsTUFDVixTQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLE9BQVM7QUFBQSxFQUNULE9BQVM7QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULFdBQWE7QUFBQSxJQUNiLE9BQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsOEJBQThCO0FBQUEsSUFDOUIsdUJBQXVCO0FBQUEsSUFDdkIsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxJQUNmLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxJQUNSLFFBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxrQkFBb0I7QUFBQSxJQUNsQix3QkFBd0I7QUFBQSxJQUN4QixLQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLHNCQUF3QjtBQUFBLElBQ3RCLHdCQUF3QjtBQUFBLE1BQ3RCLFVBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixVQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWlCO0FBQUEsSUFDZixRQUFVO0FBQUEsRUFDWjtBQUNGOzs7QUR2REEsSUFBTSxVQUFVLFFBQVEsSUFBSSxVQUFVLE1BQU07QUFFNUMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0YsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCLENBQUMsWUFBWSw0QkFBNEI7QUFBQSxJQUM1RCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBQ1gsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsR0FBRyxPQUFPLEtBQUssZ0JBQVMsWUFBWSxHQUFHLEdBQUcsT0FBTyxLQUFLLGdCQUFTLGdCQUFnQixDQUFDO0FBQUEsSUFDN0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxnQkFBZ0IsZUFBZTtBQUFBLEVBQ3RFO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsWUFBWSw0QkFBNEI7QUFBQSxFQUNwRDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
