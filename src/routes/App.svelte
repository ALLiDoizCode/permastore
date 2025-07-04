<script>
  import { onMount } from "svelte";
  import { Brain, Search, ArrowRight, Star, Download } from "lucide-svelte";
  import "@fontsource/roboto-mono/400.css";
  import "@fontsource/roboto-mono/500.css";
  import "@fontsource/roboto-mono/600.css";

  let totalWorkflows = 1247;
  let activeHubs = 89;
  let totalUsers = $state(15847);
  let isSearchActive = $state(false);
  let searchQuery = $state("");

  let featuredWorkflows = [
    {
      name: "Document Processor",
      category: "Processing",
      downloads: 2847,
      rating: 4.9,
      author: "Core",
    },
    {
      name: "Memory Agent",
      category: "Memory",
      downloads: 1923,
      rating: 4.8,
      author: "Lab",
    },
    {
      name: "Modal Analyzer",
      category: "Analysis",
      downloads: 1456,
      rating: 4.7,
      author: "Vision",
    },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      totalUsers = totalUsers + Math.floor(Math.random() * 2);
    }, 8000);

    return () => clearInterval(interval);
  });
</script>

<div class="min-h-screen bg-gray-50 font-mono">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"
          >
            <Brain class="w-5 h-5 text-slate-600" />
          </div>
          <span class="text-lg font-medium text-gray-900">Permamind Vault</span>
        </div>
        <nav class="flex items-center space-x-8">
          <a href="/discover" class="text-gray-500 hover:text-gray-700 text-sm"
            >discover</a
          >
          <a href="/publish" class="text-gray-500 hover:text-gray-700 text-sm"
            >publish</a
          >
          <a href="/docs" class="text-gray-500 hover:text-gray-700 text-sm"
            >docs</a
          >
        </nav>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="bg-white">
    <div class="max-w-6xl mx-auto px-6 py-24">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-5xl font-medium text-gray-900 mb-8 leading-tight">
          Permament Flows<br />
          <span class="text-slate-400">Made Simple</span>
        </h1>

        <div class="grid grid-cols-3 gap-12 mb-16 max-w-lg mx-auto">
          <div class="text-center">
            <div class="text-2xl font-medium text-gray-900">
              {totalWorkflows.toLocaleString()}
            </div>
            <div class="text-xs text-gray-400 mt-1">workflows</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-medium text-gray-900">{activeHubs}</div>
            <div class="text-xs text-gray-400 mt-1">hubs</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-medium text-gray-900">
              {totalUsers.toLocaleString()}
            </div>
            <div class="text-xs text-gray-400 mt-1">users</div>
          </div>
        </div>

        <div class="search-container">
          {#if isSearchActive}
            <Search class="search-icon" />
            <input
              type="text"
              class="search-input"
              placeholder="Search workflows..."
              bind:value={searchQuery}
              on:blur={() => {
                if (!searchQuery.trim()) {
                  isSearchActive = false;
                }
              }}
              on:keydown={(e) => {
                if (e.key === 'Escape') {
                  isSearchActive = false;
                  searchQuery = '';
                }
              }}
              autofocus
            />
          {:else}
            <button
              class="search-button"
              on:click={() => isSearchActive = true}
            >
              <Search class="w-4 h-4 mr-2" />
              explore
            </button>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Floating Cards Section -->
  <section class="py-24 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-green-50/20"
    ></div>
    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {#each featuredWorkflows as workflow, i}
          <div
            class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1"
            style="animation-delay: {i * 200}ms"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center"
              >
                <div class="w-3 h-3 bg-slate-300 rounded-full"></div>
              </div>
              <div class="flex items-center text-xs text-gray-400">
                <Star class="w-3 h-3 mr-1" />
                {workflow.rating}
              </div>
            </div>

            <h3 class="font-medium text-gray-900 mb-2">{workflow.name}</h3>
            <p class="text-xs text-gray-500 mb-4">
              {workflow.category} • {workflow.author}
            </p>

            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-400"
                >{workflow.downloads.toLocaleString()} downloads</span
              >
              <button class="text-xs text-gray-600 hover:text-gray-800">
                <Download class="w-3 h-3" />
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Minimal Features -->
  <section class="py-24 bg-slate-50/50">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-medium text-gray-900 mb-16">
        Built for Simplicity
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <div
            class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <div class="w-6 h-6 bg-blue-200 rounded-lg"></div>
          </div>
          <h3 class="font-medium text-gray-900 mb-3">Discover</h3>
          <p class="text-sm text-gray-500">Find workflows that matter</p>
        </div>

        <div>
          <div
            class="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <div class="w-6 h-6 bg-green-200 rounded-lg"></div>
          </div>
          <h3 class="font-medium text-gray-900 mb-3">Deploy</h3>
          <p class="text-sm text-gray-500">One-click deployment</p>
        </div>

        <div>
          <div
            class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <div class="w-6 h-6 bg-slate-200 rounded-lg"></div>
          </div>
          <h3 class="font-medium text-gray-900 mb-3">Monitor</h3>
          <p class="text-sm text-gray-500">Real-time insights</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Abstract Visualization -->
  <section class="py-24 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-blue-50/30"
    ></div>
    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl font-medium text-gray-900 mb-6">
            Decentralized<br />
            <span class="text-slate-400">Memory</span>
          </h2>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Built on Arweave for permanent storage and seamless workflow
            collaboration.
          </p>
          <button
            class="text-gray-600 hover:text-gray-800 text-sm inline-flex items-center"
          >
            Learn more <ArrowRight class="w-4 h-4 ml-2" />
          </button>
        </div>

        <div class="relative">
          <div class="grid grid-cols-3 gap-4 opacity-60">
            {#each Array(9) as _, i}
              <div
                class="aspect-square bg-gradient-to-br from-slate-100 to-blue-50 rounded-xl"
                style="animation-delay: {i *
                  100}ms; animation: float 6s ease-in-out infinite alternate;"
              ></div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Simple CTA -->
  <section class="py-24 bg-slate-900">
    <div class="max-w-4xl mx-auto text-center px-6">
      <h2 class="text-2xl font-medium text-white mb-8">Ready to start?</h2>
      <button
        class="bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-slate-100 transition-colors"
      >
        Get Started
      </button>
    </div>
  </section>

  <!-- Minimal Footer -->
  <footer class="bg-white border-t border-gray-100">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div
            class="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center"
          >
            <Brain class="w-4 h-4 text-slate-600" />
          </div>
          <span class="font-medium text-gray-900">Permamind Vault</span>
        </div>

        <div class="flex space-x-8 text-sm text-gray-500">
          <a href="/about" class="hover:text-gray-700">about</a>
          <a href="/github" class="hover:text-gray-700">github</a>
          <a href="/docs" class="hover:text-gray-700">docs</a>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(2deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
</style>
