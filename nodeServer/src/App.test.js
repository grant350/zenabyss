import React from 'react'
import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import routeObject from '../testing/unit_test_assets/routes_test.js';
import RequireAuth from './utility_components/requireAuth'

import MakeRoutes from './utility_components/make_routes';

describe('test routes to make sure correct object would be returned',function(){
  var setComponent = "home"
  test('routes can be nested', function(){
      var routes = MakeRoutes(routeObject,"home")
   expect(routes.length > 1).toBe(true)
   expect(routes[0].props.path === "/").toBe(true)
   expect(routes[1].props.children.length >1).toBe(true)
  })
})

// components are there

//add app to see if rendered okay



