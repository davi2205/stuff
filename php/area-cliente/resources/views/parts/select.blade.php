@php
  $vals = [
    'mode' => $mode ??= 0,
    'label' => $label ??= '',
  ];

  $params = [
    'mode' => $mode,
  ];
@endphp

{{-- Container --}}
<div id="{{ $id = uniqid('_') }}" class="form-group">
  
  {{-- Label --}}
  <label>{{ $label }}</label>

  {{-- Input Group --}}
  <div class="input-group">

    {{-- Input --}}
    <input type="text" class="form-control select-input"/>

    @if($mode == 0)
      {{-- Open Dropdown Action --}}
      <div
        hx-post="{{ route('parts.select') }}"
        hx-target="#{{ $id }}"
        hx-swap="outerHTML"
        hx-trigger="focus from:(#{{ $id }} .select-input)"
        hx-vals="{{ json_encode([...$vals, 'mode' => 1]) }}"
      ></div>
    @endif

    <div
      ul-template="my-template"
      ul-target="">

    @if($mode == 1)
      {{-- Dropdown --}}
      <div
        class="mt-2 select-dropdown"
        style="position: absolute; top: 100%; width: 100%; z-index: 9999;"
      >
        <div class="card">
          <div class="card-body p-0">
            <input class="form-control border-0 select-search" type="text" placeholder="Search..." />
            <div>
              <button class="btn text-left" style="width: 100%;" type="button">Button 1</button>
            </div>
            <div>
              <button class="btn text-left" style="width: 100%;" type="button">Button 2</button>
            </div>
            <div>
              <button class="btn text-left" style="width: 100%;" type="button">Button 3</button>
            </div>
          </div>
        </div>
      </div>

      {{-- Close Dropdown Action --}}
      <div
        hx-post="{{ route('parts.select') }}"
        hx-target="#{{ $id }}"
        hx-swap="outerHTML"
        hx-trigger="blurout from:(#{{ $id }} .select-dropdown)"
        hx-vals="{{ json_encode([...$vals, 'mode' => 0]) }}"
      ></div>
    @endif

  </div>

  {{-- Initialize Select Action --}}
  <div hx-effect="initSelect('#{{ $id }}', {{ json_encode($params) }})"></div>
</div>
